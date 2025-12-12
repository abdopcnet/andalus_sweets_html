/**
 * API Mapper - Connect Website to Frappe/ERPNext API
 * Direct connection to Frappe API endpoints
 */

const API_MAPPER_FILENAME = 'api_mapper.js';

// API Configuration
const API_CONFIG = {
	production: {
		url: 'https://sweets.andalus-sweets.com',
		apiKey: 'c20854c547845a3',
		apiSecret: '4603e3319d3b55b',
	},
	development: {
		url: 'http://192.168.100.106',
		apiKey: 'c20854c547845a3',
		apiSecret: '4603e3319d3b55b',
	},
};

// Current environment - change to 'development' for local testing
const CURRENT_ENV = 'production';

// Get current API configuration
const config = API_CONFIG[CURRENT_ENV];
const token = btoa(`${config.apiKey}:${config.apiSecret}`);

// Make API request to Frappe method
async function frappeApiRequest(method, data = null) {
	const url = `${config.url}/api/method/${method}`;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: 'application/json',
			Authorization: `Basic ${token}`,
		},
	};

	if (data) {
		// Convert data to URL-encoded form data
		const formData = new URLSearchParams();
		for (const key in data) {
			if (data[key] !== null && data[key] !== undefined) {
				// If value is an object or array, stringify it
				if (typeof data[key] === 'object') {
					formData.append(key, JSON.stringify(data[key]));
				} else {
					formData.append(key, data[key]);
				}
			}
		}
		options.body = formData.toString();
	}

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		if (!response.ok || result.exc) {
			const errorMsg = result.message || result.exc || 'API Error';
			console.log(`[${API_MAPPER_FILENAME}] API error: ${errorMsg}`);
			throw new Error(errorMsg);
		}

		return result.message || result;
	} catch (error) {
		console.log(`[${API_MAPPER_FILENAME}] Request error: ${error.message}`);
		throw error;
	}
}

// Check customer by mobile using Frappe REST API
async function check_customer_if_existed(mobile_no) {
	try {
		const url = `${config.url}/api/resource/Customer?filters=[["mobile_no","=","${mobile_no}"]]&fields=["name","customer_name","mobile_no"]`;
		const response = await fetch(url, {
			headers: {
				Authorization: `Basic ${token}`,
				Accept: 'application/json',
			},
		});
		const result = await response.json();
		if (result.data && result.data.length > 0) {
			return result.data[0];
		}
		return null;
	} catch {
		return null;
	}
}

// Create customer if not exists
async function create_customer_if_not_existed(mobile_no, customer_name = null, email = null) {
	const existing = await check_customer_if_existed(mobile_no);
	if (existing) {
		console.log(`[${API_MAPPER_FILENAME}] Customer exists: ${existing.name}`);
		return existing;
	}

	const customerData = {
		customer_name: customer_name || `Customer ${mobile_no}`,
		customer_type: 'Individual',
		customer_group: 'website_customers',
		mobile_no: mobile_no,
	};

	if (email) {
		customerData.email_id = email;
	}

	const customer = await frappeApiRequest('sweets_site.create_customer.create_customer', {
		customer_data: JSON.stringify(customerData),
	});

	console.log(`[${API_MAPPER_FILENAME}] Customer created: ${customer.name}`);
	return customer;
}

// Create sales order
async function create_sales_order(customer, items, delivery_date = null, branch = null) {
	const order_items = items.map((item) => ({
		item_code: String(item.id || item.item_code || `ITEM-${item.name}`),
		item_name: item.name,
		description: item.description || item.name,
		qty: item.qty || 1,
		uom: item.uom || 'Nos',
		rate: item.price || 0,
	}));

	const orderData = {
		customer: customer.name,
		delivery_date: delivery_date || new Date().toISOString().split('T')[0],
		items: order_items,
	};

	if (branch) {
		orderData.branch = branch;
	}

	const sales_order = await frappeApiRequest(
		'sweets_site.create_sales_order.create_sales_order',
		{
			order_data: JSON.stringify(orderData),
		},
	);

	console.log(`[${API_MAPPER_FILENAME}] Sales order created: ${sales_order.name}`);
	return sales_order;
}

// Submit cart as order
async function submitCartAsOrder(customerInfo) {
	try {
		// Check if cart functions are available
		if (typeof loadCart === 'undefined') {
			throw new Error(
				'Cart functions not loaded. Make sure index.js is loaded before api_mapper.js',
			);
		}

		const cart = loadCart();
		if (!cart || cart.length === 0) {
			throw new Error('Cart is empty');
		}

		const mobile_no = customerInfo.mobile_no || customerInfo.phone || customerInfo.phoneNumber;
		if (!mobile_no) {
			throw new Error('Mobile number required');
		}

		// Create or get customer
		const customer = await create_customer_if_not_existed(
			mobile_no,
			customerInfo.name || customerInfo.customer_name,
			customerInfo.email || customerInfo.email_id,
		);

		// Create sales order with branch if provided
		const sales_order = await create_sales_order(
			customer,
			cart,
			customerInfo.delivery_date || new Date().toISOString().split('T')[0],
			customerInfo.branch || null,
		);

		// Clear cart
		if (typeof saveCart !== 'undefined') {
			saveCart([]);
		}
		if (typeof updateCartUI !== 'undefined') {
			updateCartUI();
		}

		return {
			success: true,
			customer,
			sales_order,
			message: 'Order created successfully',
		};
	} catch (error) {
		console.log(`[${API_MAPPER_FILENAME}] Submit error: ${error.message}`);
		return {
			success: false,
			error: error.message,
			message: 'Failed to submit cart',
		};
	}
}

// Export functions to global scope
if (typeof window !== 'undefined') {
	window.submitCartAsOrder = submitCartAsOrder;
	window.create_customer_if_not_existed = create_customer_if_not_existed;
	window.create_sales_order = create_sales_order;
	window.check_customer_if_existed = check_customer_if_existed;
	window.frappeApiRequest = frappeApiRequest;

	// Log that API mapper is loaded
	console.log(`[${API_MAPPER_FILENAME}] API mapper loaded and functions exported`);
}
