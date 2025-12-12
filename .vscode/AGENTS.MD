---
alwaysApply: true
---

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

The project follows a **modular structure** where each page has its own dedicated folder containing all related files (HTML, CSS, JS, images, videos). Shared functionality is centralized in root files.

**Page Modules (6 Main Pages):**

```
index.html          # Home page (NOT a router - actual page content)
index.css           # Shared CSS (fonts, navbar, footer, cart, location modal)
index.js            # Shared JavaScript (cart, location modal, navbar/footer loading)

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

contact/
  ├── images/          # Contact page images
  ├── contact.html
  ├── contact.js
  └── contact.css

orders/
  ├── orders.html      # Shopping cart/orders page
  ├── orders.js
  └── orders.css

special-orders/
  ├── special-orders.html
  ├── special-orders.js
  └── special-orders.css
```

**Shared Components:**

```
shared/
  ├── navbar/
  │   ├── images/          # Navbar images (logos, icons)
  │   └── navbar.html      # Navbar HTML component (no separate CSS/JS)
  ├── footer/
  │   └── footer.html      # Footer HTML component (no separate CSS/JS)
  └── fonts/
      └── dg-kufi.ttf      # Custom Arabic font

images/              # Root-level shared images (home page images)
```

**Root Files:**

-   `index.html` - **Home page** (actual page content, not a router)
-   `index.css` - **All shared CSS** (fonts, navbar, footer, cart, location modal, common styles)
-   `index.js` - **All shared JavaScript** (cart functions, location modal, navbar/footer loading, initialization)
-   `favicon.ico` - Site favicon

**Important:**

-   `index.html` IS the home page with actual content
-   All shared JavaScript is in `index.js` (cart, location modal, navbar/footer loading)
-   All shared CSS is in `index.css` (no separate `shared/main.css`)
-   No separate `cart/` or `utils/` folders - everything is in root `index.js`

### 1.2. Path Conventions

**Relative Paths:**

-   Each page uses **relative paths** to reference shared components
-   Shared components use relative paths to reference each other
-   Example from `sweets/sweets.html`:
    -   CSS: `../index.css`, `sweets.css`
    -   JS: `../index.js`, `sweets.js`
    -   Images: `images/` (local), `../shared/navbar/images/` (shared)
    -   Pages: `../food/food.html`, `../contact/contact.html`

**Path Rules:**

-   Page-specific assets: Use relative paths from page folder (e.g., `images/logo.png`)
-   Shared components: Use `../shared/` to access shared components (e.g., `../shared/navbar/navbar.html`, `../shared/footer/footer.html`)
-   Shared CSS/JS: Use `../index.css` and `../index.js` from page folders
-   Cross-page links: Use relative paths (e.g., `../sweets/sweets.html`)
-   Root page (index.html): Use `shared/navbar/navbar.html` (no `../`)

### 1.3. Page Structure

Each HTML page includes:

-   Navbar (loaded dynamically via `index.js` into `#navbar-container`)
-   Location Modal (defined in `index.css`, handled by `index.js`)
-   Page-specific content
-   Footer (loaded dynamically via `index.js` into `#footer-container`)
-   Page-specific CSS and JS files
-   Shared CSS (`../index.css`) and JS (`../index.js`) files

## 2. CODE ANALYSIS PRINCIPLES 🧭

1. **Always read actual files** - Never guess or assume code structure
2. **Understand vanilla JavaScript** - No Vue.js, use plain JavaScript
3. **Check file structure** - Each page is in its own module folder
4. **Verify paths** - All paths are relative, check folder structure
5. **Check localStorage** - Cart and location data stored in localStorage
6. **Module location** - Know which module you're working in
7. **Shared code location** - Cart, location modal, navbar/footer loading are all in `index.js`

## 3. ASSET MANAGEMENT 📦

### 3.1. Image Paths

**Page-specific images:**

-   Location: `[page]/images/`
-   Path in HTML/JS: `images/[filename]`
-   Example: `sweets/images/banner4.png` → `images/banner4.png` in `sweets.html`

**Shared images (navbar):**

-   Location: `shared/navbar/images/`
-   Path: `../shared/navbar/images/[filename]` (from page folders)
-   Path: `shared/navbar/images/[filename]` (from root index.html)
-   Example: `../shared/navbar/images/mazaq_alandalus_navbar.jpg`

**Root-level shared images:**

-   Location: `images/` (root folder)
-   Path: `images/[filename]` (from root index.html)
-   Example: `images/elandalus.jpg` in `index.html`

**Never use absolute paths** - Always use relative paths from the current file location

### 3.2. Video Paths

**Page-specific videos:**

-   Location: `[page]/videos/`
-   Path: `videos/[filename]`
-   Example: `sweets/videos/sweets_slideshow.mp4` → `videos/sweets_slideshow.mp4` in `sweets.html`

**Root-level videos (home page):**

-   Location: `videos/` (root folder, if exists)
-   Path: `videos/[filename]` (from root index.html)

**Cross-page video references:**

-   Use relative paths: `../[page]/videos/[filename]`
-   Example: `../sweets/videos/sweets_slideshow.mp4` from `index.html`

### 3.3. CSS Organization

**Page-specific CSS:**

-   Location: `[page]/[page].css`
-   Linked as: `<link rel="stylesheet" href="[page].css" />`

**Shared CSS:**

-   `index.css` - **All shared styles** (fonts, navbar, footer, cart, location modal, common styles)
-   Linked as: `<link rel="stylesheet" href="../index.css" />` (from page folders)
-   Linked as: `<link rel="stylesheet" href="index.css" />` (from root index.html)

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

-   `index.js` - **All shared functionality**:
    -   Cart management functions (`loadCart()`, `saveCart()`, `addToCart()`, `removeFromCart()`, `getCartCount()`, `updateCartUI()`, etc.)
    -   Location modal functions (`showLocationModal()`, `hideLocationModal()`, `confirmLocation()`, `initLocationModal()`)
    -   Navbar loader (`loadNavbar()`, `initializeNavbar()`)
    -   Footer loader (`loadFooter()`)
    -   Main initialization (`DOMContentLoaded` handler)
-   Linked as: `<script src="../index.js"></script>` (from page folders)
-   Linked as: `<script src="index.js"></script>` (from root index.html)

**No ES6 modules** - All scripts are loaded via `<script>` tags, functions are global

### 4.2. Cart Management

-   Cart stored in `localStorage.getItem("cart")`
-   Functions in `index.js`: `addToCart()`, `removeFromCart()`, `getCartCount()`, `updateCartUI()`, etc.
-   Cart updates trigger `window.dispatchEvent(new Event("cartUpdated"))`
-   All pages import `index.js` via relative path

### 4.3. Location Management

-   Location stored in `localStorage.getItem("userLocation")`
-   Location modal functions in `index.js`
-   Public pages (don't require location): Home (index.html), Food, Sweets, Contact, SpecialOrders
-   Location modal HTML is defined in `index.css` (modal styles)

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
-   Common styles in `index.css` (no separate `shared/main.css`)
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

-   Arabic font: `"Aref Ruqaa", serif` / `"DG Kufi"` (custom font from `shared/fonts/dg-kufi.ttf`)
-   English font: `"Cairo", "Segoe UI", sans-serif`

### 5.4. Direct Inline Styles Method

**When requested, replace all `class` attributes with direct inline `style` attributes:**

1. **Convert CSS classes to inline styles:**

    - Read CSS rules from `index.css` or page-specific CSS files
    - Convert each CSS property to inline style format
    - Replace `class="class-name"` with `style="property: value; property: value;"`
    - Example: `class="hero-banner"` → `style="background: linear-gradient(...); padding: 20px 0px; display: flex; ..."`

2. **Style attribute formatting:**

    - Use semicolons to separate properties: `style="property1: value1; property2: value2;"`
    - For long styles, use multi-line format for readability:
        ```html
        <div
        	style="
                background: linear-gradient(...);
                padding: 20px 0px;
                display: flex;
                align-items: center;
            "
        ></div>
        ```
    - Remove trailing semicolons from last property (optional, but consistent)

3. **CSS to inline conversion rules:**

    - Copy all CSS properties from class definition
    - Convert CSS syntax to inline style syntax (same format)
    - Include all properties: `display`, `padding`, `margin`, `background`, `color`, `font-size`, etc.
    - Preserve `!important` flags if present: `font-family: 'DG Kufi' !important;`
    - Convert complex values: gradients, shadows, transforms, etc.

4. **When to use inline styles:**

    - When explicitly requested by user
    - For specific elements that need direct styling
    - When CSS classes are not available or need to be bypassed

5. **Important notes:**
    - Inline styles have higher specificity than CSS classes
    - Inline styles cannot use CSS selectors (no `:hover`, `:before`, etc.)
    - Media queries cannot be applied to inline styles
    - Keep CSS file linked for other styles (navbar, footer, etc.)

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
2. Create subfolders: `images/`, `videos/` (if needed)
3. Create files: `[page-name].html`, `[page-name].js`, `[page-name].css`
4. Link shared CSS: `<link rel="stylesheet" href="../index.css" />`
5. Link shared JS: `<script src="../index.js"></script>`
6. Add navbar/footer containers: `<div id="navbar-container"></div>`, `<div id="footer-container"></div>`
7. Update navbar links in `shared/navbar/navbar.html` to include new page
8. **Do NOT modify `index.html`** - it's the home page, not a router

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

1. **Navbar/Footer**: Edit `shared/navbar/navbar.html` or `shared/footer/footer.html`
2. **Shared CSS**: Edit `index.css`
3. **Shared JS**: Edit `index.js` (cart, location modal, navbar/footer loading)
4. Changes affect all pages using the component
5. Test across multiple pages

### 7.4. Adding New Image/Video

1. Add file to appropriate folder:
    - Page-specific: `[page]/images/` or `[page]/videos/`
    - Shared (navbar): `shared/navbar/images/`
    - Root-level: `images/` or `videos/` (for home page)
2. Use relative path in HTML/JS:
    - Page-specific: `images/[filename]` or `videos/[filename]`
    - Shared: `../shared/navbar/images/[filename]` (from page folders)
    - Root-level: `images/[filename]` or `videos/[filename]` (from root)

## 8. DEBUGGING & TROUBLESHOOTING 🐛

### 8.1. Common Issues

-   **Images not loading**: Check relative path from current file location
-   **Styles not applying**: Verify CSS file is linked correctly (check relative path)
-   **JavaScript not working**: Check browser console for errors, verify script paths
-   **Links not working**: Verify relative path to target page (e.g., `../sweets/sweets.html`)
-   **Cache issues**: Clear browser cache or use incognito mode
-   **Navbar/Footer not loading**: Check `index.js` is loaded and `loadNavbar()`/`loadFooter()` are called

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
-   📁 **PROJECT STRUCTURE** - Modular structure, each page in own folder, shared code in root files
-   🧭 **CODE ANALYSIS PRINCIPLES** - Read actual files, understand vanilla JavaScript, check module location
-   📦 **ASSET MANAGEMENT** - Use relative paths, follow modular folder structure
-   ⚡ **JAVASCRIPT BEST PRACTICES** - Page-specific and shared modules, localStorage, DOM manipulation
-   🎨 **STYLING GUIDELINES** - Page-specific CSS, shared CSS in index.css, RTL layout, responsive breakpoints, direct inline styles method
-   🛠️ **DEVELOPMENT WORKFLOW** - Read before edit, identify module, verify relative paths
-   🔧 **COMMON TASKS** - Follow modular patterns for products, pages, styles, components
-   🐛 **DEBUGGING** - Check relative paths, console errors, cache, file locations
-   ✨ **CODE QUALITY STANDARDS** - Review syntax, English comments, consistent formatting, relative paths
-   ✅ **COMMUNICATION** - Short English responses, numbered points, verify changes, check paths

---

## Module Reference Quick Guide

**Page Modules (6 Main Pages):**

-   `index.html` - Home page (root)
-   `sweets/` - Sweets restaurant page
-   `food/` - Food restaurant page
-   `contact/` - Contact page
-   `orders/` - Shopping cart/orders page
-   `special-orders/` - Special orders page

**Shared Components:**

-   `shared/navbar/` - Navigation bar (images, HTML)
-   `shared/footer/` - Footer (HTML)
-   `shared/fonts/` - Custom fonts
-   `index.css` - All shared CSS
-   `index.js` - All shared JavaScript (cart, location modal, navbar/footer loading)

**Path Examples:**

-   From `sweets/sweets.html` to `food/food.html`: `../food/food.html`
-   From `sweets/sweets.html` to shared CSS: `../index.css`
-   From `sweets/sweets.html` to shared JS: `../index.js`
-   From `sweets/sweets.html` to navbar image: `../shared/navbar/images/cart.png`
-   From `sweets/sweets.html` to local image: `images/banner4.png`
-   From `index.html` to navbar: `shared/navbar/navbar.html`
-   From `index.html` to shared CSS: `index.css`
-   From `index.html` to shared JS: `index.js`
