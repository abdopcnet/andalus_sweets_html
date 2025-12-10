# Andalus Sweets - AI Agent Guidelines

## 1. PROJECT STRUCTURE 📁

### 1.1. Directory Organization

- `/assets/images/` - Organized by page:
  - `food/` - Images for food-restaurant page
  - `sweets/` - Images for sweets-restaurant page
  - `special_orders/` - Images for special-orders page
  - `navbar/` - Navigation bar images (logos)
  - `login/` - Login page images
  - `contact/` - Contact page images (whatsapp, etc.)
- `/assets/videos/` - Organized by page:
  - `food/` - Videos for food-restaurant page
  - `sweets/` - Videos for sweets-restaurant page
  - `home/` - Videos for home page
- `/assets/js/index.js` - Main Vue.js application (compiled)
- `/assets/css/app.css` - Main stylesheet
- `/index.html` - Entry point

### 1.2. Component Structure

Main components in `assets/js/index.js`:

- `Home` - Home page component
- `FoodRestaurant` - Food restaurant page (`/food-restaurant`)
- `SweetsRestaurant` - Sweets restaurant page (`/sweets-restaurant`)
- `SpecialOreders` - Special orders page (`/special-orders`)
- `Contact` - Contact page (`/contact`)
- `Orders` - Shopping cart page (`/Orders`)
- `Checkout` - Checkout page (`/checkout`)
- `Login` - Login page (`/Login`)
- `NavBar` - Navigation bar component
- `Footer` - Footer component
- `LocationModal` - Location registration modal

## 2. CODE ANALYSIS PRINCIPLES 🧭

1. **Always read actual files** - Never guess or assume code structure
2. **Understand Vue.js patterns** - This is a Vue 3 application using Composition API
3. **Check routes first** - Routes are defined in `assets/js/index.js` around line 2827
4. **Verify component names** - Component names are in camelCase (e.g., `FoodRestaurant`, `SweetsRestaurant`)
5. **Check data scoping** - Each component has its own `data()`, `computed`, `methods`, and `mounted()` hooks

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

### 3.3. CSS Scoping

- All styles use Vue scoped attributes: `[data-v-xxxxxxx]`
- Each component has unique scope ID
- When modifying styles, always include the scope attribute

## 4. VUE.JS BEST PRACTICES ⚡

### 4.1. Component Data

- Use `data()` function to return reactive data
- Use `computed` for derived state
- Use `methods` for event handlers and business logic
- Use `mounted()` for DOM manipulation after component mount

### 4.2. Router Navigation

- Routes use Vue Router with `createRouter` and `createWebHistory`
- Route guards in `router.beforeEach` check for user location
- Public pages don't require location: Home, FoodRestaurant, SweetsRestaurant, Contact, SpecialOreders

### 4.3. State Management

- Cart state managed via `useCart()` composable
- User location stored in `localStorage.getItem("userLocation")`
- No global state management library (Pinia/Vuex) - using composables

## 5. STYLING GUIDELINES 🎨

### 5.1. CSS Organization

- Styles organized by component using scope IDs
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

### 6.2. Cache Busting

- Update version parameter in `index.html` when assets change
- Current version: `?v=2`
- Increment version (e.g., `?v=3`) after major changes

### 6.3. Code Formatting

- JavaScript: Prettier (via `esbenp.prettier-vscode`)
- CSS: Follow existing indentation (2 spaces)
- Use consistent naming: camelCase for variables, PascalCase for components

## 7. COMMON TASKS 🔧

### 7.1. Adding New Product

1. Find component data array (e.g., `FoodRestaurant.products`)
2. Add product object with: `id`, `name`, `price`, `category`, `image`
3. Use correct image path: `/assets/images/[folder]/[file]`

### 7.2. Modifying Routes

1. Locate routes array in `assets/js/index.js` (around line 2827)
2. Add/modify route object with: `path`, `name`, `component`, `meta.title`
3. Update `publicPages` array in router guard if needed

### 7.3. Updating Styles

1. Find component scope ID (e.g., `[data-v-2e1210db]` for FoodRestaurant)
2. Add/modify CSS rules with scope attribute
3. Test responsive breakpoints

## 8. DEBUGGING & TROUBLESHOOTING 🐛

### 8.1. Common Issues

- **Images not loading**: Check path format (must start with `/assets/`)
- **Styles not applying**: Verify scope ID matches component
- **Route not working**: Check route name matches component name
- **Cache issues**: Update version parameter in `index.html`

### 8.2. Browser Cache

- Meta tags in `index.html` prevent caching
- Version parameters force reload: `?v=2`
- Clear browser cache if changes don't appear

## 9. CODE QUALITY STANDARDS ✨

1. **Syntax Review**: Always check syntax before saving
2. **Consistent Formatting**: Follow existing code style
3. **Comments**: Write English comments above code sections
4. **Naming**: Use descriptive names in English or Arabic (for UI text)
5. **Error Handling**: Add console.log for debugging, remove before production

## 10. COMMUNICATION & VERIFICATION ✅

1. **Start with context**: Explain what you're doing
2. **Numbered responses**: Use numbered points for clarity
3. **Simple English**: Write clearly for Arabic readers
4. **Verify changes**: Always check linter errors after edits
5. **End with summary**: List what was changed

---

## Applied Rules Summary

When working on this project, apply these principles:

- 📁 **PROJECT STRUCTURE** - Follow organized asset folders
- 🧭 **CODE ANALYSIS PRINCIPLES** - Read actual files, understand Vue.js patterns
- 📦 **ASSET MANAGEMENT** - Use absolute paths, follow folder structure
- ⚡ **VUE.JS BEST PRACTICES** - Follow Vue 3 Composition API patterns
- 🎨 **STYLING GUIDELINES** - Use scoped CSS, respect RTL layout
- 🛠️ **DEVELOPMENT WORKFLOW** - Read before edit, update cache version
- 🔧 **COMMON TASKS** - Follow established patterns for products, routes, styles
- 🐛 **DEBUGGING** - Check paths, scope IDs, routes, cache
- ✨ **CODE QUALITY STANDARDS** - Review syntax, consistent formatting
- ✅ **COMMUNICATION** - Clear explanations, numbered points, verify changes
