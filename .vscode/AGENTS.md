# Andalus Sweets - AI Agent Guidelines

## 0. COMMUNICATION RULES 📢

**CRITICAL: All AI responses must be in SHORT ENGLISH ONLY**

-   Keep responses brief and direct
-   Use simple, clear English
-   Avoid lengthy explanations
-   Number points when listing items
-   End with a summary of changes

**CODE COMMENTS: English only, above every section**

-   All code comments must be in English
-   Place comments above code sections, not inline
-   Use clear, descriptive comments
-   Example:
    ```javascript
    // Handle form submission
    function handleSubmit() {
    	// Form logic here
    }
    ```

## 1. PROJECT STRUCTURE 📁

### 1.1. Modular Directory Organization

The project follows a **modular structure** where each page and shared component has its own dedicated folder containing all related files (HTML, CSS, JS, images, videos).

**Page Modules:**

```
home/
  ├── images/          # Home page images
  ├── videos/          # Home page videos
  ├── home.html        # Home page HTML
  ├── home.js          # Home page JavaScript (if needed)
  └── home.css         # Home page styles

sweets/
  ├── images/          # Sweets page images
  ├── videos/          # Sweets page videos
  ├── sweets.html      # Sweets page HTML
  ├── sweets.js        # Sweets page JavaScript
  └── sweets.css       # Sweets page styles

food/
  ├── images/          # Food page images
  ├── videos/          # Food page videos
  ├── food.html        # Food page HTML
  ├── food.js          # Food page JavaScript
  └── food.css         # Food page styles

special-orders/
  ├── images/          # Special orders page images
  ├── videos/          # Special orders page videos
  ├── special-orders.html
  ├── special-orders.js
  └── special-orders.css

contact/
  ├── images/          # Contact page images
  ├── videos/          # Contact page videos
  ├── contact.html
  ├── contact.js
  └── contact.css

orders/
  ├── images/          # Orders page images
  ├── videos/          # Orders page videos
  ├── orders.html
  ├── orders.js
  └── orders.css
```

**Shared Components:**

```
navbar/
  ├── images/          # Navbar images (logos, icons)
  ├── navbar.html      # Navbar HTML component
  ├── navbar.js        # Navbar JavaScript
  └── navbar.css       # Navbar styles

footer/
  ├── footer.html      # Footer HTML component
  └── footer.css       # Footer styles

cart/
  └── cart.js          # Cart management functions

utils/
  ├── utils.js         # Utility functions (location modal, etc.)
  └── main.js          # Main initialization script

shared/
  └── main.css         # Common shared styles (fonts, reset, etc.)
```

**Root Files:**

-   `index.html` - Redirects to `home/home.html`
-   `favicon.ico` - Site favicon

### 1.2. Path Conventions

**Relative Paths:**

-   Each page uses **relative paths** to reference shared components
-   Shared components use relative paths to reference each other
-   Example from `sweets/sweets.html`:
    -   CSS: `../shared/main.css`, `../navbar/navbar.css`
    -   JS: `../cart/cart.js`, `../utils/utils.js`
    -   Images: `images/` (local), `../navbar/images/` (shared)
    -   Pages: `../food/food.html`, `../contact/contact.html`

**Path Rules:**

-   Page-specific assets: Use relative paths from page folder (e.g., `images/logo.png`)
-   Shared components: Use `../` to go up one level (e.g., `../navbar/navbar.css`)
-   Cross-page links: Use relative paths (e.g., `../sweets/sweets.html`)

### 1.3. Page Structure

Each HTML page includes:

-   Navbar (embedded in HTML)
-   Location Modal (for location selection)
-   Page-specific content
-   Footer (embedded in HTML)
-   Page-specific CSS and JS files
-   Shared CSS and JS files (via relative paths)

## 2. CODE ANALYSIS PRINCIPLES 🧭

1. **Always read actual files** - Never guess or assume code structure
2. **Understand vanilla JavaScript** - No Vue.js, use plain JavaScript
3. **Check file structure** - Each page is in its own module folder
4. **Verify paths** - All paths are relative, check folder structure
5. **Check localStorage** - Cart and location data stored in localStorage
6. **Module location** - Know which module you're working in

## 3. ASSET MANAGEMENT 📦

### 3.1. Image Paths

**Page-specific images:**

-   Location: `[page]/images/`
-   Path in HTML/JS: `images/[filename]`
-   Example: `sweets/images/banner4.png` → `images/banner4.png` in `sweets.html`

**Shared images (navbar):**

-   Location: `navbar/images/`
-   Path: `../navbar/images/[filename]`
-   Example: `../navbar/images/mazaq_alandalus_navbar.jpg`

**Never use absolute paths** - Always use relative paths from the current file location

### 3.2. Video Paths

**Page-specific videos:**

-   Location: `[page]/videos/`
-   Path: `videos/[filename]`
-   Example: `sweets/videos/sweets_slideshow.mp4` → `videos/sweets_slideshow.mp4` in `sweets.html`

**Cross-page video references:**

-   Use relative paths: `../[page]/videos/[filename]`
-   Example: `../sweets/videos/sweets_slideshow.mp4` from `home/home.html`

### 3.3. CSS Organization

**Page-specific CSS:**

-   Location: `[page]/[page].css`
-   Linked as: `<link rel="stylesheet" href="[page].css" />`

**Shared CSS:**

-   `shared/main.css` - Common styles (fonts, reset, location modal)
-   `navbar/navbar.css` - Navigation bar styles
-   `footer/footer.css` - Footer styles
-   Linked as: `<link rel="stylesheet" href="../shared/main.css" />`

**Responsive breakpoints:**

-   Desktop: `min-width: 769px`
-   Tablet: `max-width: 768px`
-   Mobile: `max-width: 480px`

## 4. JAVASCRIPT BEST PRACTICES ⚡

### 4.1. Module Structure

**Page-specific JavaScript:**

-   Location: `[page]/[page].js`
-   Contains page-specific logic (product rendering, form handling, etc.)
-   Linked as: `<script src="[page].js"></script>`

**Shared JavaScript:**

-   `cart/cart.js` - Cart management functions
-   `utils/utils.js` - Utility functions (location modal, navigation)
-   `utils/main.js` - Main initialization
-   `navbar/navbar.js` - Navbar functionality
-   Linked as: `<script src="../cart/cart.js"></script>`

**No ES6 modules** - All scripts are loaded via `<script>` tags, functions are global

### 4.2. Cart Management

-   Cart stored in `localStorage.getItem("cart")`
-   Functions in `cart/cart.js`: `addToCart()`, `removeFromCart()`, `getCartCount()`, etc.
-   Cart updates trigger `window.dispatchEvent(new Event("cartUpdated"))`
-   All pages import `cart/cart.js` via relative path

### 4.3. Location Management

-   Location stored in `localStorage.getItem("userLocation")`
-   Location modal functions in `utils/utils.js`
-   Public pages (don't require location): Home, Food, Sweets, Contact, SpecialOrders
-   Public page paths in `utils/utils.js` must match actual file paths

### 4.4. DOM Manipulation

-   Use `document.addEventListener("DOMContentLoaded", ...)` for initialization
-   Use `querySelector()` and `querySelectorAll()` for element selection
-   Use `addEventListener()` for event handling

### 4.5. Image Paths in JavaScript

-   Page-specific images: `images/[filename]` (relative to page folder)
-   Update product data arrays in page JS files to use relative paths
-   Example in `sweets/sweets.js`: `image: "images/cake.jpg"`

## 5. STYLING GUIDELINES 🎨

### 5.1. CSS Organization

-   Page-specific styles in `[page]/[page].css`
-   Common styles in `shared/main.css`, `navbar/navbar.css`, `footer/footer.css`
-   No scoped attributes - plain CSS classes
-   Responsive breakpoints:
    -   Desktop: `min-width: 769px`
    -   Tablet: `max-width: 768px`
    -   Mobile: `max-width: 480px`
-   Use RTL (right-to-left) for Arabic content

### 5.2. Color Scheme

-   Primary Orange: `#ff6f00` / `#ff6b35`
-   Text Dark: `#5d4e37`
-   Background: `#fafafa` / `#fff5e6`

### 5.3. Typography

-   Arabic font: `"Aref Ruqaa", serif`
-   English font: `"Cairo", "Segoe UI", sans-serif`

## 6. DEVELOPMENT WORKFLOW 🛠️

### 6.1. File Editing Protocol

1. **Read files completely** before editing
2. **Identify module location** - Know which page/module you're working in
3. **Use search tools** to find exact locations
4. **Verify paths** - Check if assets exist and paths are correct (relative paths)
5. **Test changes** - Ensure no breaking changes
6. **Add English comments** above code sections

### 6.2. Adding New Page

1. Create new module folder: `[page-name]/`
2. Create subfolders: `images/`, `videos/`
3. Create files: `[page-name].html`, `[page-name].js`, `[page-name].css`
4. Link shared CSS: `../shared/main.css`, `../navbar/navbar.css`, `../footer/footer.css`
5. Link shared JS: `../cart/cart.js`, `../utils/utils.js`, `../navbar/navbar.js`, `../utils/main.js`
6. Update navbar links in all pages to include new page
7. Update `utils/utils.js` public pages array if needed

### 6.3. Cache Busting

-   Meta tags in HTML files prevent caching
-   No version parameters needed (static files)
-   Clear browser cache if changes don't appear

### 6.4. Code Formatting

-   JavaScript: camelCase for variables, English comments
-   CSS: Follow existing indentation (tabs, 4 spaces)
-   HTML: Use semantic HTML5 elements
-   Comments: English only, above sections

## 7. COMMON TASKS 🔧

### 7.1. Adding New Product

1. Find product data array in page JS file (e.g., `sweets/sweets.js`)
2. Add product object with: `id`, `name`, `price`, `category`, `image`
3. Use relative image path: `images/[filename]` (relative to page folder)
4. Update render function if needed
5. Add product image to `[page]/images/` folder

### 7.2. Updating Page Styles

1. Find page-specific CSS file: `[page]/[page].css`
2. Add/modify CSS rules
3. Test responsive breakpoints
4. Add English comments above sections

### 7.3. Updating Shared Component

1. Identify component folder: `navbar/`, `footer/`, `cart/`, `utils/`
2. Edit component files in that folder
3. Changes affect all pages using the component
4. Test across multiple pages

### 7.4. Adding New Image/Video

1. Add file to appropriate folder:
    - Page-specific: `[page]/images/` or `[page]/videos/`
    - Shared (navbar): `navbar/images/`
2. Use relative path in HTML/JS:
    - Page-specific: `images/[filename]` or `videos/[filename]`
    - Shared: `../navbar/images/[filename]`

## 8. DEBUGGING & TROUBLESHOOTING 🐛

### 8.1. Common Issues

-   **Images not loading**: Check relative path from current file location
-   **Styles not applying**: Verify CSS file is linked correctly (check relative path)
-   **JavaScript not working**: Check browser console for errors, verify script paths
-   **Links not working**: Verify relative path to target page (e.g., `../sweets/sweets.html`)
-   **Cache issues**: Clear browser cache or use incognito mode

### 8.2. Path Debugging

-   **Relative path calculation**: Count folder levels from current file to target
    -   Same folder: `filename.ext`
    -   Parent folder: `../filename.ext`
    -   Sibling folder: `../sibling/filename.ext`
-   **Check file exists**: Verify file is in expected location
-   **Browser DevTools**: Use Network tab to see failed requests

### 8.3. Browser Cache

-   Meta tags in HTML files prevent caching
-   Clear browser cache if changes don't appear
-   Use browser DevTools to verify file loading

## 9. CODE QUALITY STANDARDS ✨

1. **Syntax Review**: Always check syntax before saving
2. **Consistent Formatting**: Follow existing code style
3. **Comments**: Write English comments above code sections
4. **Naming**: Use descriptive names in English (camelCase for variables)
5. **Error Handling**: Add console.log for debugging, remove before production
6. **English Only**: All code comments and AI responses in English
7. **Path Consistency**: Always use relative paths, never absolute paths

## 10. COMMUNICATION & VERIFICATION ✅

1. **Short English responses** - Keep it brief and direct
2. **Numbered points** - Use numbered lists for clarity
3. **Verify changes** - Always check linter errors after edits
4. **End with summary** - List what was changed
5. **English comments** - All code comments in English, above sections
6. **Path verification** - Verify all paths are relative and correct

---

## Applied Rules Summary

When working on this project, apply these principles:

-   📢 **COMMUNICATION RULES** - Short English only, English comments above sections
-   📁 **PROJECT STRUCTURE** - Modular structure, each page/component in own folder
-   🧭 **CODE ANALYSIS PRINCIPLES** - Read actual files, understand vanilla JavaScript, check module location
-   📦 **ASSET MANAGEMENT** - Use relative paths, follow modular folder structure
-   ⚡ **JAVASCRIPT BEST PRACTICES** - Page-specific and shared modules, localStorage, DOM manipulation
-   🎨 **STYLING GUIDELINES** - Page-specific CSS, shared CSS, RTL layout, responsive breakpoints
-   🛠️ **DEVELOPMENT WORKFLOW** - Read before edit, identify module, verify relative paths
-   🔧 **COMMON TASKS** - Follow modular patterns for products, pages, styles, components
-   🐛 **DEBUGGING** - Check relative paths, console errors, cache, file locations
-   ✨ **CODE QUALITY STANDARDS** - Review syntax, English comments, consistent formatting, relative paths
-   ✅ **COMMUNICATION** - Short English responses, numbered points, verify changes, check paths

---

## Module Reference Quick Guide

**Page Modules:**

-   `home/` - Home page
-   `sweets/` - Sweets restaurant page
-   `food/` - Food restaurant page
-   `special-orders/` - Special orders page
-   `contact/` - Contact page
-   `orders/` - Shopping cart page

**Shared Components:**

-   `navbar/` - Navigation bar (images, HTML, JS, CSS)
-   `footer/` - Footer (HTML, CSS)
-   `cart/` - Cart management (JS)
-   `utils/` - Utilities and main init (JS)
-   `shared/` - Shared styles (CSS)

**Path Examples:**

-   From `sweets/sweets.html` to `food/food.html`: `../food/food.html`
-   From `sweets/sweets.html` to `navbar/navbar.css`: `../navbar/navbar.css`
-   From `sweets/sweets.html` to local image: `images/banner4.png`
-   From `sweets/sweets.html` to navbar image: `../navbar/images/cart.png`
