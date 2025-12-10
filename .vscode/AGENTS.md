# Andalus Sweets - AI Agent Guidelines

## 0. COMMUNICATION RULES 📢

**CRITICAL: All AI responses must be in SHORT ENGLISH ONLY**

- Keep responses brief and direct
- Use simple, clear English
- Avoid lengthy explanations
- Number points when listing items
- End with a summary of changes

**CODE COMMENTS: English only, above every section**

- All code comments must be in English
- Place comments above code sections, not inline
- Use clear, descriptive comments
- Example:
  ```javascript
  // Handle form submission
  function handleSubmit() {
    // Form logic here
  }
  ```

## 1. PROJECT STRUCTURE 📁

### 1.1. Directory Organization

- `/assets/images/` - Organized by page:
  - `food/` - Images for food-restaurant page
  - `sweets/` - Images for sweets-restaurant page
  - `special_orders/` - Images for special-orders page
  - `navbar/` - Navigation bar images (logos)
  - `login/` - Login page images
  - `contact/` - Contact page images
- `/assets/videos/` - Organized by page:
  - `food/` - Videos for food-restaurant page
  - `sweets/` - Videos for sweets-restaurant page
  - `home/` - Videos for home page
- `/assets/js/` - JavaScript modules:
  - `main.js` - Main initialization
  - `cart.js` - Cart management functions
  - `navbar.js` - Navbar functionality
  - `utils.js` - Utility functions (location modal, etc.)
  - `food.js` - Food restaurant page logic
  - `sweets.js` - Sweets restaurant page logic
  - `special-orders.js` - Special orders page logic
  - `contact.js` - Contact page logic
- `/assets/css/` - Stylesheets:
  - `main.css` - Common styles (fonts, reset, location modal)
  - `navbar.css` - Navigation bar styles
  - `footer.css` - Footer styles
  - `home.css` - Home page styles
  - `food.css` - Food restaurant page styles
  - `sweets.css` - Sweets restaurant page styles
  - `special-orders.css` - Special orders page styles
  - `contact.css` - Contact page styles
- `/components/` - Reusable HTML components:
  - `navbar.html` - Navigation bar component
  - `footer.html` - Footer component
- `/backup/` - Old Vue.js files (not used):
  - `assets/js/index.js` - Old Vue.js application
  - `assets/js/vendor.js` - Old Vue.js vendor bundle
  - `assets/js/bootstrap.js` - Old Bootstrap bundle
  - `assets/css/app.css` - Old main stylesheet
  - `assets/css/bootstrap.css` - Old Bootstrap stylesheet

### 1.2. Page Structure

**Static HTML Pages:**

- `index.html` - Home page
- `food-restaurant.html` - Food restaurant page
- `sweets-restaurant.html` - Sweets restaurant page
- `special-orders.html` - Special orders page
- `contact.html` - Contact page
- `orders.html` - Shopping cart page (to be created)
- `checkout.html` - Checkout page (to be created)
- `login.html` - Login page (to be created)

**Each HTML page includes:**

- Navbar (embedded or loaded via fetch)
- Location Modal (for location selection)
- Page-specific content
- Footer (embedded or loaded via fetch)
- Page-specific CSS and JS files

## 2. CODE ANALYSIS PRINCIPLES 🧭

1. **Always read actual files** - Never guess or assume code structure
2. **Understand vanilla JavaScript** - No Vue.js, use plain JavaScript
3. **Check file structure** - Each page is a separate HTML file
4. **Verify paths** - All paths are absolute starting with `/assets/`
5. **Check localStorage** - Cart and location data stored in localStorage

## 3. ASSET MANAGEMENT 📦

### 3.1. Image Paths

- Always use absolute paths starting with `/assets/images/`
- Follow the organized folder structure (food/, sweets/, navbar/, etc.)
- Never use relative paths like `../assets/` - use `/assets/images/[folder]/[file]`

### 3.2. Video Paths

- Use absolute paths: `/assets/videos/[folder]/[file].mp4`
- Current videos:
  - `food/foods_slideshow.mp4` - Food restaurant hero video
  - `sweets/sweets_slideshow.mp4` - Sweets restaurant hero video
  - `home/chef-icon.mp4` - Home page chef video

### 3.3. CSS Organization

- Each page has its own CSS file (e.g., `food.css`, `sweets.css`)
- Common styles in `main.css`, `navbar.css`, `footer.css`
- No scoped attributes - plain CSS classes
- Responsive breakpoints:
  - Desktop: `min-width: 769px`
  - Tablet: `max-width: 768px`
  - Mobile: `max-width: 480px`

## 4. JAVASCRIPT BEST PRACTICES ⚡

### 4.1. Module Structure

- Use ES6 modules: `export` and `import`
- Each page has its own JS file
- Common functions in shared modules (cart.js, utils.js, navbar.js)

### 4.2. Cart Management

- Cart stored in `localStorage.getItem("cart")`
- Functions in `cart.js`: `addToCart()`, `removeFromCart()`, `getCartCount()`, etc.
- Cart updates trigger `window.dispatchEvent(new Event("cartUpdated"))`

### 4.3. Location Management

- Location stored in `localStorage.getItem("userLocation")`
- Location modal functions in `utils.js`
- Public pages don't require location: Home, FoodRestaurant, SweetsRestaurant, Contact, SpecialOrders

### 4.4. DOM Manipulation

- Use `document.addEventListener("DOMContentLoaded", ...)` for initialization
- Use `querySelector()` and `querySelectorAll()` for element selection
- Use `addEventListener()` for event handling

## 5. STYLING GUIDELINES 🎨

### 5.1. CSS Organization

- Page-specific styles in separate CSS files
- Common styles in shared CSS files
- Responsive breakpoints:
  - Desktop: `min-width: 769px`
  - Tablet: `max-width: 768px`
  - Mobile: `max-width: 480px`
- Use RTL (right-to-left) for Arabic content

### 5.2. Color Scheme

- Primary Orange: `#ff6f00` / `#ff6b35`
- Text Dark: `#5d4e37`
- Background: `#fafafa` / `#fff5e6`

### 5.3. Typography

- Arabic font: `"Aref Ruqaa", serif`
- English font: `"Cairo", "Segoe UI", sans-serif`

## 6. DEVELOPMENT WORKFLOW 🛠️

### 6.1. File Editing Protocol

1. **Read files completely** before editing
2. **Use search tools** to find exact locations
3. **Verify paths** - Check if assets exist before referencing
4. **Test changes** - Ensure no breaking changes
5. **Add English comments** above code sections

### 6.2. Cache Busting

- Meta tags in HTML files prevent caching
- No version parameters needed (static files)
- Clear browser cache if changes don't appear

### 6.3. Code Formatting

- JavaScript: Use ES6 modules, camelCase for variables
- CSS: Follow existing indentation (2 spaces)
- HTML: Use semantic HTML5 elements
- Comments: English only, above sections

## 7. COMMON TASKS 🔧

### 7.1. Adding New Product

1. Find product data array in page JS file (e.g., `food.js`)
2. Add product object with: `id`, `name`, `price`, `category`, `image`
3. Use correct image path: `/assets/images/[folder]/[file]`
4. Update render function if needed

### 7.2. Creating New Page

1. Create HTML file (e.g., `new-page.html`)
2. Include Navbar and Footer
3. Create page-specific CSS file (e.g., `new-page.css`)
4. Create page-specific JS file (e.g., `new-page.js`)
5. Link CSS and JS files in HTML

### 7.3. Updating Styles

1. Find page-specific CSS file
2. Add/modify CSS rules
3. Test responsive breakpoints
4. Add English comments above sections

## 8. DEBUGGING & TROUBLESHOOTING 🐛

### 8.1. Common Issues

- **Images not loading**: Check path format (must start with `/assets/`)
- **Styles not applying**: Verify CSS file is linked in HTML
- **JavaScript not working**: Check browser console for errors
- **Cache issues**: Clear browser cache or use incognito mode

### 8.2. Browser Cache

- Meta tags in HTML files prevent caching
- Clear browser cache if changes don't appear
- Use browser DevTools to verify file loading

## 9. CODE QUALITY STANDARDS ✨

1. **Syntax Review**: Always check syntax before saving
2. **Consistent Formatting**: Follow existing code style
3. **Comments**: Write English comments above code sections
4. **Naming**: Use descriptive names in English (camelCase for variables)
5. **Error Handling**: Add console.log for debugging, remove before production
6. **English Only**: All code comments and AI responses in English

## 10. COMMUNICATION & VERIFICATION ✅

1. **Short English responses** - Keep it brief and direct
2. **Numbered points** - Use numbered lists for clarity
3. **Verify changes** - Always check linter errors after edits
4. **End with summary** - List what was changed
5. **English comments** - All code comments in English, above sections

---

## Applied Rules Summary

When working on this project, apply these principles:

- 📢 **COMMUNICATION RULES** - Short English only, English comments above sections
- 📁 **PROJECT STRUCTURE** - Static HTML pages, organized asset folders
- 🧭 **CODE ANALYSIS PRINCIPLES** - Read actual files, understand vanilla JavaScript
- 📦 **ASSET MANAGEMENT** - Use absolute paths, follow folder structure
- ⚡ **JAVASCRIPT BEST PRACTICES** - ES6 modules, localStorage, DOM manipulation
- 🎨 **STYLING GUIDELINES** - Page-specific CSS, RTL layout, responsive breakpoints
- 🛠️ **DEVELOPMENT WORKFLOW** - Read before edit, add English comments
- 🔧 **COMMON TASKS** - Follow established patterns for products, pages, styles
- 🐛 **DEBUGGING** - Check paths, console errors, cache
- ✨ **CODE QUALITY STANDARDS** - Review syntax, English comments, consistent formatting
- ✅ **COMMUNICATION** - Short English responses, numbered points, verify changes
