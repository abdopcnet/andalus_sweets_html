/* API Mapper - Connect Website to Frappe/ERPNext API */
/* Maps cart orders to Customer and Sales Order DocTypes */

// Import API configuration
// Note: Include this file before api_mapper.js: <script src="config/api_config.js"></script>

// ============================================
// API Helper Functions
// ============================================

/**
 * Make authenticated API request to Frappe directly
 * Note: CORS must be enabled in Frappe site_config.json
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint (e.g., '/api/resource/Customer')
 * @param {object} data - Request body data
 * @returns {Promise<object>} API response
 */
async function frappeApiRequest(method, endpoint, data = null) {
	const apiUrl = getApiUrl();
	const apiKey = getApiKey();
	const apiSecret = getApiSecret();

	// Build full URL
	const url = `${apiUrl}${endpoint}`;

	// Create Basic Auth token (base64 encode api_key:api_secret)
	const token = btoa(`${apiKey}:${apiSecret}`);

	const headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: `Basic ${token}`,
	};

	const options = {
		method: method,
		headers: headers,
	};

	if (data && (method === 'POST' || method === 'PUT')) {
		options.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(url, options);

		// Get response text first to check if it's valid JSON
		const responseText = await response.text();

		let result;
		try {
			result = JSON.parse(responseText);
		} catch (parseError) {
			console.error('JSON Parse Error:', parseError, 'Response:', responseText);
			throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
		}

		if (!response.ok) {
			const errorMessage =
				result.message || result.exc || result.error || `API Error: ${response.status}`;
			console.error('API Error Response:', result);
			throw new Error(errorMessage);
		}

		return result;
	} catch (error) {
		console.error('API Request Error:', error);
		throw error;
	}
}

// ============================================
// Customer Management Functions
// ============================================

/**
 * Search for customer by mobile number
 * @param {string} mobileNo - Customer mobile number
 * @returns {Promise<object|null>} Customer object or null if not found
 */
async function findCustomerByMobile(mobileNo) {
	try {
		const endpoint = `/api/resource/Customer?filters=[["mobile_no","=","${mobileNo}"]]&fields=["name","customer_name","mobile_no","email_id"]`;
		const response = await frappeApiRequest('GET', endpoint);
		if (response.data && response.data.length > 0) {
			return response.data[0];
		}
		return null;
	} catch (error) {
		console.error('Error finding customer:', error);
		return null;
	}
}

/**
 * Create new customer in Frappe
 * @param {object} customerData - Customer data object
 * @returns {Promise<object>} Created customer object
 */
async function createCustomer(customerData) {
	try {
		const endpoint = '/api/resource/Customer';
		const response = await frappeApiRequest('POST', endpoint, customerData);
		return response.data;
	} catch (error) {
		console.error('Error creating customer:', error);
		throw error;
	}
}

/**
 * Update existing customer
 * @param {string} customerName - Customer name (ID)
 * @param {object} customerData - Updated customer data
 * @returns {Promise<object>} Updated customer object
 */
async function updateCustomer(customerName, customerData) {
	try {
		const endpoint = `/api/resource/Customer/${customerName}`;
		const response = await frappeApiRequest('PUT', endpoint, customerData);
		return response.data;
	} catch (error) {
		console.error('Error updating customer:', error);
		throw error;
	}
}

/**
 * Get or create customer by phone number
 * @param {object} orderData - Order data containing customer information
 * @returns {Promise<object>} Customer object (existing or newly created)
 */
async function getOrCreateCustomer(orderData) {
	const mobileNo = orderData.mobile_no || orderData.phone || orderData.phoneNumber;

	if (!mobileNo) {
		throw new Error('Mobile number is required to create customer');
	}

	// Search for existing customer
	let customer = await findCustomerByMobile(mobileNo);

	if (customer) {
		// Update customer if needed
		const updateData = {};
		if (orderData.customer_name && !customer.customer_name) {
			updateData.customer_name = orderData.customer_name;
		}

		if (Object.keys(updateData).length > 0) {
			customer = await updateCustomer(customer.name, updateData);
		}

		return customer;
	}

	// Create new customer with all required fields
	const customerData = {
		customer_name: orderData.customer_name || orderData.name || `Customer ${mobileNo}`,
		customer_type: orderData.customer_type || 'Individual',
		customer_group: orderData.customer_group || 'Individual',
		territory: orderData.territory || 'All Territories',
		mobile_no: mobileNo,
		language: orderData.language || 'ar',
		disabled: 0,
	};

	const newCustomer = await createCustomer(customerData);
	return newCustomer;
}

// ============================================
// Sales Order Management Functions
// ============================================

/**
 * Create sales order in Frappe
 * @param {object} orderData - Complete order data
 * @param {object} customer - Customer object
 * @param {array} cartItems - Cart items array
 * @returns {Promise<object>} Created sales order object
 */
async function createSalesOrder(orderData, customer, cartItems) {
	try {
		// Prepare sales order items with all required fields
		const items = cartItems.map((item, index) => ({
			item_code: item.id || item.item_code || `ITEM-${item.name}`,
			item_name: item.name,
			description: item.description || item.name,
			qty: item.qty || 1,
			uom: item.uom || 'Nos',
			rate: item.price || 0,
			amount: (item.price || 0) * (item.qty || 1),
			idx: index + 1,
		}));

		// Calculate totals
		const totalQty = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
		const total = cartItems.reduce(
			(sum, item) => sum + (item.price || 0) * (item.qty || 1),
			0,
		);
		const netTotal = total;
		const grandTotal = total;

		// Prepare sales order data with all required fields
		const salesOrderData = {
			customer: customer.name,
			customer_name: customer.customer_name,
			transaction_date: new Date().toISOString().split('T')[0],
			delivery_date: orderData.delivery_date || new Date().toISOString().split('T')[0],
			company: orderData.company || 'Your Company',
			currency: orderData.currency || 'SAR',
			selling_price_list: orderData.price_list || 'Standard Selling',
			items: items,
			total_qty: totalQty,
			total: total,
			net_total: netTotal,
			grand_total: grandTotal,
			rounded_total: grandTotal,
			status: 'Draft',
			docstatus: 0, // Draft status
		};

		// Add optional fields if provided
		if (orderData.territory) salesOrderData.territory = orderData.territory;
		if (orderData.customer_group) salesOrderData.customer_group = orderData.customer_group;
		if (orderData.contact_person) salesOrderData.contact_person = orderData.contact_person;
		if (orderData.shipping_address)
			salesOrderData.shipping_address = orderData.shipping_address;
		if (orderData.payment_terms_template)
			salesOrderData.payment_terms_template = orderData.payment_terms_template;

		const endpoint = '/api/resource/Sales Order';
		const response = await frappeApiRequest('POST', endpoint, salesOrderData);
		return response.data;
	} catch (error) {
		console.error('Error creating sales order:', error);
		throw error;
	}
}

// ============================================
// Main Order Submission Function
// ============================================

/**
 * Submit order to Frappe/ERPNext system
 * Creates customer (if not exists) and sales order
 * @param {object} orderData - Order data with customer info and cart items
 * @returns {Promise<object>} Result object with customer and sales order
 */
async function submitOrderToFrappe(orderData) {
	try {
		// Validate required data
		if (!orderData.mobile_no && !orderData.phone && !orderData.phoneNumber) {
			throw new Error('Phone number is required');
		}

		if (!orderData.cart || !Array.isArray(orderData.cart) || orderData.cart.length === 0) {
			throw new Error('Cart items are required');
		}

		// Step 1: Get or create customer by phone number
		const customer = await getOrCreateCustomer(orderData);
		console.log('Customer:', customer);

		// Step 2: Create sales order
		const salesOrder = await createSalesOrder(orderData, customer, orderData.cart);
		console.log('Sales Order:', salesOrder);

		return {
			success: true,
			customer: customer,
			salesOrder: salesOrder,
			message: 'Order submitted successfully',
		};
	} catch (error) {
		console.error('Error submitting order:', error);
		return {
			success: false,
			error: error.message,
			message: 'Failed to submit order',
		};
	}
}

// ============================================
// Integration with Website Cart
// ============================================

/**
 * Submit current cart as order to Frappe
 * Uses cart from localStorage and customer info from form/modal
 * @param {object} customerInfo - Customer information object
 * @returns {Promise<object>} Submission result
 */
async function submitCartAsOrder(customerInfo) {
	try {
		// Get cart from localStorage
		const cart = loadCart();

		if (!cart || cart.length === 0) {
			throw new Error('Cart is empty');
		}

		// Prepare order data
		const orderData = {
			customer_name: customerInfo.name || customerInfo.customer_name || '',
			mobile_no: customerInfo.mobile_no || customerInfo.phone || customerInfo.phoneNumber,
			territory: customerInfo.territory || 'All Territories',
			customer_group: customerInfo.customer_group || 'Individual',
			delivery_date: customerInfo.delivery_date || new Date().toISOString().split('T')[0],
			shipping_address: customerInfo.address || customerInfo.shipping_address || '',
			cart: cart,
		};

		// Submit to Frappe
		const result = await submitOrderToFrappe(orderData);

		if (result.success) {
			// Clear cart after successful submission
			saveCart([]);
			updateCartUI();
		}

		return result;
	} catch (error) {
		console.error('Error submitting cart:', error);
		return {
			success: false,
			error: error.message,
			message: 'Failed to submit cart',
		};
	}
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
	window.frappeApiRequest = frappeApiRequest;
	window.findCustomerByMobile = findCustomerByMobile;
	window.createCustomer = createCustomer;
	window.getOrCreateCustomer = getOrCreateCustomer;
	window.createSalesOrder = createSalesOrder;
	window.submitOrderToFrappe = submitOrderToFrappe;
	window.submitCartAsOrder = submitCartAsOrder;
}
