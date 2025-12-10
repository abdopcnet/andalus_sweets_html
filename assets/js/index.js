import {
  c as createElementBlock,
  a as createCommentVNode,
  b as createBaseVNode,
  w as withDirectives,
  v as vModelSelect,
  d as createStaticVNode,
  t as toDisplayString,
  o as openBlock,
  r as ref,
  e as createVNode,
  f as withCtx,
  g as resolveComponent,
  n as normalizeClass,
  h as withModifiers,
  i as createTextVNode,
  F as Fragment,
  j as computed,
  k as renderList,
  l as onMounted,
  m as vModelText,
  p as createRouter,
  q as createWebHistory,
  s as createApp,
} from "./vendor.js";
import "./bootstrap.js";
/* empty css              */
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]'))
    processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes)
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true,
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$c = {
  name: "LocationModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedBranch: "",
      detecting: false,
    };
  },
  methods: {
    getCurrentLocation() {
      this.detecting = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location:", position.coords);
            this.detecting = false;
            alert("تم الحصول على موقعك");
          },
          (error) => {
            console.error("Error:", error);
            this.detecting = false;
            alert("لم نتمكن من الحصول على موقعك");
          }
        );
      }
    },
    confirmLocation() {
      if (this.selectedBranch) {
        localStorage.setItem("userLocation", this.selectedBranch);
        this.$emit("update:visible", false);
        alert("تم اختيار الفرع: " + this.selectedBranch);
      } else {
        alert("الرجاء اختيار فرع");
      }
    },
  },
};
const _hoisted_1$a = {
  key: 0,
  class: "modal-overlay",
};
const _hoisted_2$8 = { class: "modal-content" };
const _hoisted_3$7 = { class: "modal-header" };
const _hoisted_4$7 = { class: "modal-body" };
const _hoisted_5$6 = ["disabled"];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.visible
    ? (openBlock(),
      createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("div", _hoisted_3$7, [
            _cache[4] ||
              (_cache[4] = createBaseVNode("h2", null, "اختر موقعك", -1)),
            createBaseVNode(
              "button",
              {
                onClick:
                  _cache[0] ||
                  (_cache[0] = ($event) => _ctx.$emit("update:visible", false)),
                class: "close-btn",
              },
              "×"
            ),
          ]),
          createBaseVNode("div", _hoisted_4$7, [
            withDirectives(
              createBaseVNode(
                "select",
                {
                  "onUpdate:modelValue":
                    _cache[1] ||
                    (_cache[1] = ($event) => ($data.selectedBranch = $event)),
                  class: "form-control",
                },
                [
                  ...(_cache[5] ||
                    (_cache[5] = [
                      createStaticVNode(
                        '<option value="" data-v-f5356a62>اختر الفرع</option><option value="khudraa" data-v-f5356a62>فرع الخضراء</option><option value="nawaria" data-v-f5356a62>فرع النوارية</option><option value="sharai" data-v-f5356a62>فرع الشرائع</option><option value="sitteen" data-v-f5356a62>فرع الستين</option><option value="awali" data-v-f5356a62>فرع العوالي</option>',
                        6
                      ),
                    ])),
                ],
                512
              ),
              [[vModelSelect, $data.selectedBranch]]
            ),
            createBaseVNode(
              "button",
              {
                onClick:
                  _cache[2] ||
                  (_cache[2] = (...args) =>
                    $options.getCurrentLocation &&
                    $options.getCurrentLocation(...args)),
                disabled: $data.detecting,
                class: "location-btn",
              },
              toDisplayString(
                $data.detecting ? "جاري التحديد..." : "📍 موقعي الحالي"
              ),
              9,
              _hoisted_5$6
            ),
            createBaseVNode(
              "button",
              {
                onClick:
                  _cache[3] ||
                  (_cache[3] = (...args) =>
                    $options.confirmLocation &&
                    $options.confirmLocation(...args)),
                class: "confirm-btn",
              },
              "تأكيد"
            ),
          ]),
        ]),
      ]))
    : createCommentVNode("", true);
}
const LocationModal = /* @__PURE__ */ _export_sfc(_sfc_main$c, [
  ["render", _sfc_render$6],
  ["__scopeId", "data-v-f5356a62"],
]);
const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
function useCart() {
  const addToCart = (product) => {
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
    alert(`تمت إضافة ${product.name} إلى السلة ✅`);
  };
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };
  const increaseQty = (productId) => {
    const item = cart.value.find((item2) => item2.id === productId);
    if (item) {
      item.qty++;
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  };
  const decreaseQty = (productId) => {
    const item = cart.value.find((item2) => item2.id === productId);
    if (item && item.qty > 1) {
      item.qty--;
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  };
  const cartCount = () => {
    return cart.value.reduce((total, item) => total + item.qty, 0);
  };
  const totalPrice = () => {
    return cart.value.reduce((total, item) => total + item.price * item.qty, 0);
  };
  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartCount,
    totalPrice,
  };
}
const _imports_0$5 = "/assets/images/navbar/mazaq_alandalus_navbar.jpg";
const _imports_1$4 = "/assets/images/navbar/cart.png";
const _imports_2$4 = "/assets/images/navbar/customer_info.png";
const _imports_3$4 = "/assets/images/navbar/contact_us.png";
const _imports_4$1 = "/assets/images/navbar/mazaq_alnubala.jpg";
const _imports_5 = "/assets/images/navbar/mazaq_alandalus_logo.png";
const _imports_6 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAADZJJREFUeJzt22mYnFWVB/DfqU5CBwyEAIpkWEYDOODDJqjI6oAgiooIjhpQNCb4JHRXNzsuDw0ijwRMd3WToCABIYADGECJoiIIZCIRosCoqICDCyoEkpAoBJKuOx/et6urO71Ub86H8f+lqm7de7Y6773nnnOKf+L/N6LWianFBKtdpKAUrZ4ZLsPU5CBlpwhvxc758O+xXHJttFs2XNrDQU0GSE0mS+7EQVgcJR8aKqM0x87GuQbvHGTqvTglSv4wVB7DwaAGSC0mWGWJcCT+qOCEaPVTSEXvknwYhwpTc3p/EZYKi6LV3ZAavF3BXdgKq/BV3K7gqZzNNJ2OE07FFLyIo6NkeSI0O0JykuRgvB4Jf8EDwi3R5ntjZ4Ci+ZiNPyp7R3T4U2q0q7AQBw+yfKnkS8J12A7fU++jcYkX++R1jq2s9028GyslHxc+L/O8gbBc+GS0eXwwfXpjQAOkJgdJ7scGvDVKHktFh+IOTMZzQjuWGOcJ8IrdhGOFBpnSXZzu8IwPxS06B+R5ojo7WIz3Vw2vRLtwZw8+Be9FA16LdfhQlPxwCPoPYoCie/BOSUu0uyCd5k3q/CRX/habmRFzretzbfZrXoMP4nm8OUqerUWoVPQ6/ALbYrF6n+rXa842yXoLhRNkRjg4Sh6rhQ8DGCA121PZf2OdzfxLzLUuFd2HQ3GLkv+I7FnsX5EWBWucouzRaLeiVqFy/vtL9jLZtdGiPOBcQqObhRMkPzXFgYOt6cK4AageJzPQTTHXutTsSGWH4jmbmTGY8pALsbAWQTZZ2+phPFzTXFJKZgiHCW+12rH4di1rC/1+U3Z4Tv0H+efp+ef2/tz+/xLRYa2kI//4sVrX9W+AsBvYUHHdt4FOdw5Lwn8EUi5beHutS/o3QNcOPsFz+eddwES/G45s/xBM9CRIdkwtAzzeVRjIABn+XtkoNw5bsH8UXq7IWtYy8HHbhYEegeyXn+B1IPkLeNUbRyDiWKNLtr/WskkzkAFS7k519gPhgXz82BEIOLYoeF/+7oHal/SPe2RuPxWEG/PxhnS2ScORbyyRzrGVLCok3FDruoEMcLWyHaKkHaLNPViK11pvYRrCVXqskQjrLZRFjg9r891a1w5+GTrTFl719mj3o9TsDcp+ji0lt0pmRIe1I5B9xMhD7oU4Hi8J+w/lUjTYZWiy5DFsj0OiZHlq9A7hu7Kr7UpJh4IlXvXbWOBvI1GmVqTZXmOC3fL9qEH2y6+TfCDa3TsUWgMeg9FmDW6UhcwHQLRbJjkA92M74ULJCuOtS41Du4mlopSKte3WVWvuNt46yQpcIFN+mfC2oSpPLY/ALONt4d3R6jubfNfgMOHjwtvwJtTZaJeY7/e1MO9SPko1ZqayrNLT6MRvhIdwnTb31nrs9cag0VJcaQObKg/R4T7cB6noLhxtvLdQmwGGjHH2z9/9MEqOGQ2Sg0eCtSO7MyRvGUWaPdFFOw3taj0QRs8AURGqTwOkZlNqJdXv3MiDsoKfDVG6fjF6Bui+Ne7X+6tU9JSyF9IZth2MTDrDtspeSMVKwrQa+/XiNWL0uQfkebkT8JGc6SSZsZ6Q3K/ghmjr+SvEfL9PRSuxXSraqVdaexXe4FXTZOmx/tFp1/zdCz1kmmNn2Q31+b422VR0AD6Kw7GrbINfJVmOG01xR19Zok08IBXtbgc/wzdxHHbC1rJzf3/hdMmKVLQ4F6oamVE23Qeye0VUlOsfqTLnyR7j4ys0e2SJ0mn+NTW5HT9FM/bFa7AFdhROEBZb7aHUuCn/HgZIp9sNy7CX5LfCTAVvtMEk9SZLDsJXsBYfNM4jqcFRVST63gciz+SGaYMaoHvOEz3G+9gAU6P3qPNzyQewVrhM2YE2mKSkoGwa5uAp7Cc8mIp2ryZbeQRSi3FWu01WmLjNeifFlV7qJd4yLEtnmmuDy3GigjtSs6Oi1QPCCglROa66hO/6NWv3gNTLA8L++Um/AlKTwyW3YQL+03iNcVkleZOhw1NYkGa7zgSLckMtTi32jpYsv9HtAaucjD3wuILpfSjfLctlnouSD6MV9cpuSmebJFXcs28PqMUAcg8o9DJAsi8Y5+F0jq0kN2KCcFmUfGQT5avZL/A34aP4NfawxkndonXR7wpkmB6lytV3QKQWBav8WDhEuCDatKSi51QXREYXz0fJdqnJhZIvCPeZ7N9rTYGnRp8QrsWSKGV5jeo9IEt6bvT9WqXJGZ+bUffp/Io8amd0H3g4tShIZoKyz9aqPKjLapWqPLT6GJyEZL5VQ5Eo2i1LRX/AThr8m+wZPRoXR8nnhkKrP6RGFwvnSVZ40Z6y2+nTwyild+lWSehUe8BKhKIdhy6hR0Gd3QaLCIeFQoXWCuU8XR85z6Fgox3ydyu7SXejS/CjhyHgyyDZvCpK26H/BUNEsj3o9DPJ5vlYv5t0vwhH5K8V4xWqvrwpf52TTlQ3RAG3ydcepuCvOk2Nkr2GLGA/iJK9dZrq754VDst5DmmjTS3G5RVrkpu7xrsNsMa38DvJ3nZw5hBlXIKyZJaCR4wfg9R52NWWHsUMlNVY+6tgtXPxZjxpa7d2k61CanJMpbzErCi5ulb6earsKlkskfA19c7tr6xdM91zbOUVc/OdP2Rl809HyfIhyPYZYQGSsmOiI6936iMjlBqdKVyafbBQp7Njfs+LCaQmr5c0Ck9oc02QUosJ1vis5DxZhPaMZE60u2PImmeyfFC4XLafvCL5kikuiRavJkKTGZJpQina8sJN9fozbGujufhkrm1ztGmrntNnKio1+mRusXq8hNuxHM8L2ys7UDg2/x6+i091NUCkBnsouArvyAi61UYNscBfa1I8M+7lskwvLBVmdWV78waKa6hkhV7GncKDkuck2+QF0vdjc6zHqVFyXW9e/TdIFO0uuVR4r77zBmX8EPtjGzwrzIg2S8ijxNVm42LZubsaZylZ2F/+rupXvVTWhbIW59naV7sCnlR0LK6WtcW8ILsdHtWPLmXJEuGsKPlNOtMWNjog2vx4UANUhGqyi7J3C3tKNlfwd2W/UnBXtHk6NZuq07V5F1mSLFDnrGjNjsZ0uh11WkClpHav5NRo73nbyxuvriTvS0i+I5kdHf4EqdlEZV/BZxCSu9U5JVo9U5GxYA9lWwgv4RfC96PN0/n6PZXdhN3x/ihlEe+oVHfyFpVG4RJshseVTY8OP6/MafY+ZVfISm3rhUtMdjHKVpkjfEl2h38WZ1e7a2r05rzctRc2CBeb7MJawuDUbJpOTcIsjMcv1Tk+5vntqBmgwqzJPpIbZCfBK5LPm2JexX2bTZHMk3w85/1IvnQf2WPxDQVnRGsWsuaXrdNz40zAr4Tp0eaRNMt49c4XGiSPCg/iaclGoV6YlvcV7pvz6MQVNjivuoAz6vW91GyiTpcKs3P6P1Lwier22rzf6Gt4Q5Vwx0ep+2xPzaYq+waO0OvRyh+XG+TFmkGwFrcIX+mrZDZmBc7U4CgF18o6O9cIs6MtjzblhkrOkXxW5pr/o+wz0eEHqcnxkitlm+tKBTO6CjOpyaclbbLH5WllpyqYIOwtmSrU4RVlf8JD1vpJXGt9f3KOaYU3nem1NliI9+ZDV9ugqdoFU6O3CF/X9RgkD8kaqWGJ8T7VlexIjT5SCdlZpN5pIw20xrzEnbIb5u26Oz+fVDC9q9+YSjruDJyPifnwt5UcV31k5vPuEBZVe9NIMLYeULQTrsB78qHVsgzzBuECz/hydetsajZN2ZW6O8rvVGd2zPPHsZJxTAyQH4szhctkQdAayTnWu8bmPif5giy4elDZSdHRXQTJPeZkzJPtAS/hQn922WB9xsPBWJwCeyq7CgfmHG6WNFb3CadGRwi3yYzzojAn2nq2taTZtjdOh6wHGH6iYGa0+uVoyjtqBkizjDfR6bKa/Wayfv6GKPlWj3kNtlQwn+7MbI5bvOrUuMLqHvOz0HcBdpR1rc9Tdn50eGU05B6dSLDJgZKrsCeSsEho6gpoes1bJDv/X5acJ6zGfFk15w84OUru77EuM9oXcZrs0XlSMms4DRG9MSIDpFPUm2yuZE4u2K8xM0qW9piXRW0XCGejDssVnBStWe4/D1dvyI+/TsmXrXdB3pvQTafZIfkm+SbZZWyBF5010Dk/GEZWHd7SzZIGdApfVLbPJsqfbjcT/ZdwXj50ka0d3KU8RKsnrXcwLsoGfE69pb1redHqAWX7CF+URY+n2cptI+lYG/bCvDR1L1YJ7+pdLYZUNFNWPcqitsy9l/ae12vNwbgeu+BvaOorM5Wa7Ce5G1tLjol2dw1Hj+F7QMqTHeH63sqnObZJRYtxpUz5Reo39Y6+ECVL1VcuVa/B11PRt9KcPPHaNS/jeX3+cbD/LvWL4Rsg8rR0r+xsanakcR6T/VVmjfCxKDl5KCFrXOLFaHcSpsv+QXa8cR5NzY7sNXXbXIuXh6/GMJFHbY/LNrW5yu5RcDxm5XTvl7n8iP7/l+bYWZ3rhUNkGZ4rFNyKw/OAKpTtGx3DKJQY6SnQpEkyrxedDcL5njF3tCK3dKI6U50rOV92c6zGRVHyheHSHnEckG+GM/E6PKHg8tGO1iq8ivZCs2QP4c+4pjqH8E/8E0PH/wJdsrEvRI9StAAAAABJRU5ErkJggg==";
const _imports_7 = "/assets/images/navbar/cart.png";
const _sfc_main$b = {
  name: "MainNavbar",
  components: {
    LocationModal,
  },
  setup() {
    const { cartCount } = useCart();
    const count = computed(() => cartCount());
    return { count };
  },
  data() {
    return {
      isMenuOpen: false,
      isModalOpen: false,
      // controls modal visibility
    };
  },
};
const _hoisted_1$9 = { class: "navbar" };
const _hoisted_2$7 = { class: "navbar-left" };
const _hoisted_3$6 = {
  key: 0,
  class: "cart-badge",
};
const _hoisted_4$6 = { class: "navbar-center" };
const _hoisted_5$5 = { class: "navbar-right" };
const _hoisted_6$5 = {
  key: 0,
  class: "cart-badge",
};
const _hoisted_7$5 = { class: "desktop-menu" };
const _hoisted_8$4 = { class: "navbar-center main-links" };
const _hoisted_9$4 = { class: "navbar-center" };
const _hoisted_10$3 = { class: "navbar-right" };
const _hoisted_11$3 = {
  key: 0,
  class: "cart-badge",
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_LocationModal = resolveComponent("LocationModal");
  return (
    openBlock(),
    createElementBlock(
      Fragment,
      null,
      [
        createBaseVNode("nav", _hoisted_1$9, [
          createBaseVNode("div", _hoisted_2$7, [
            createVNode(
              _component_router_link,
              { to: "/" },
              {
                default: withCtx(() => [
                  ...(_cache[4] ||
                    (_cache[4] = [
                      createBaseVNode(
                        "img",
                        {
                          src: _imports_0$5,
                          alt: "Company Logo",
                          class: "logo",
                        },
                        null,
                        -1
                      ),
                    ])),
                ]),
                _: 1,
              }
            ),
          ]),
          createVNode(
            _component_router_link,
            {
              to: "/Orders",
              class: "nav-item cart-icon mobile-only-cart",
            },
            {
              default: withCtx(() => [
                $setup.count > 0
                  ? (openBlock(),
                    createElementBlock(
                      "span",
                      _hoisted_3$6,
                      toDisplayString($setup.count),
                      1
                    ))
                  : createCommentVNode("", true),
                _cache[5] ||
                  (_cache[5] = createBaseVNode(
                    "img",
                    { src: _imports_1$4 },
                    null,
                    -1
                  )),
              ]),
              _: 1,
            }
          ),
          createBaseVNode(
            "button",
            {
              class: "menu-toggle",
              onClick:
                _cache[0] ||
                (_cache[0] = ($event) =>
                  ($data.isMenuOpen = !$data.isMenuOpen)),
            },
            [
              ...(_cache[6] ||
                (_cache[6] = [
                  createBaseVNode("span", null, null, -1),
                  createBaseVNode("span", null, null, -1),
                  createBaseVNode("span", null, null, -1),
                ])),
            ]
          ),
          createBaseVNode(
            "div",
            {
              class: normalizeClass([
                "mobile-menu",
                { "is-open": $data.isMenuOpen },
              ]),
            },
            [
              createBaseVNode("div", _hoisted_4$6, [
                createVNode(
                  _component_router_link,
                  {
                    to: "/Orders",
                    class: "nav-item",
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[7] ||
                        (_cache[7] = [createTextVNode("عروض", -1)])),
                    ]),
                    _: 1,
                  }
                ),
                createBaseVNode(
                  "a",
                  {
                    href: "#",
                    onClick:
                      _cache[1] ||
                      (_cache[1] = withModifiers(
                        ($event) => ($data.isModalOpen = true),
                        ["prevent"]
                      )),
                    class: "nav-item",
                  },
                  [
                    ...(_cache[8] ||
                      (_cache[8] = [
                        createBaseVNode(
                          "img",
                          {
                            src: _imports_2$4,
                            alt: "",
                          },
                          null,
                          -1
                        ),
                        createTextVNode(" سجل بياناتك ", -1),
                      ])),
                  ]
                ),
                createVNode(
                  _component_router_link,
                  {
                    to: "/Contact",
                    class: "nav-item",
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[9] ||
                        (_cache[9] = [
                          createBaseVNode(
                            "img",
                            {
                              src: _imports_3$4,
                              alt: "",
                            },
                            null,
                            -1
                          ),
                          createTextVNode("اتصل بنا ", -1),
                        ])),
                    ]),
                    _: 1,
                  }
                ),
                createVNode(
                  _component_router_link,
                  {
                    to: "/food-restaurant",
                    class: "nav-item",
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[10] ||
                        (_cache[10] = [
                          createBaseVNode(
                            "img",
                            {
                              src: _imports_4$1,
                              style: { height: "4vh" },
                            },
                            null,
                            -1
                          ),
                          createTextVNode(" مذاق النبلاء للمأكولات ", -1),
                        ])),
                    ]),
                    _: 1,
                  }
                ),
                createVNode(
                  _component_router_link,
                  {
                    to: "/sweets-restaurant",
                    class: "nav-item",
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[11] ||
                        (_cache[11] = [
                          createBaseVNode(
                            "img",
                            {
                              src: _imports_5,
                              style: { height: "4vh" },
                            },
                            null,
                            -1
                          ),
                          createTextVNode("مذاق الأندلس للحلويات ", -1),
                        ])),
                    ]),
                    _: 1,
                  }
                ),
                createVNode(
                  _component_router_link,
                  {
                    to: "/special-orders",
                    class: "nav-item",
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[12] ||
                        (_cache[12] = [
                          createBaseVNode(
                            "img",
                            {
                              src: _imports_6,
                              style: { height: "4vh" },
                            },
                            null,
                            -1
                          ),
                          createTextVNode(" عروض المناسبات والحفلات ", -1),
                        ])),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              createBaseVNode("div", _hoisted_5$5, [
                createVNode(
                  _component_router_link,
                  {
                    to: "/Orders",
                    class: "nav-item cart-icon",
                  },
                  {
                    default: withCtx(() => [
                      _cache[13] ||
                        (_cache[13] = createBaseVNode(
                          "img",
                          {
                            src: _imports_7,
                            alt: "",
                          },
                          null,
                          -1
                        )),
                      _cache[14] ||
                        (_cache[14] = createTextVNode(" عربة التسوق ", -1)),
                      $setup.count > 0
                        ? (openBlock(),
                          createElementBlock(
                            "span",
                            _hoisted_6$5,
                            toDisplayString($setup.count),
                            1
                          ))
                        : createCommentVNode("", true),
                      _cache[15] ||
                        (_cache[15] = createBaseVNode(
                          "img",
                          { src: _imports_1$4 },
                          null,
                          -1
                        )),
                    ]),
                    _: 1,
                  }
                ),
              ]),
            ],
            2
          ),
          createBaseVNode("div", _hoisted_7$5, [
            createBaseVNode("div", _hoisted_8$4, [
              createVNode(
                _component_router_link,
                {
                  to: "/food-restaurant",
                  class: "nav-item",
                },
                {
                  default: withCtx(() => [
                    ...(_cache[16] ||
                      (_cache[16] = [
                        createBaseVNode(
                          "img",
                          {
                            src: _imports_4$1,
                            style: { height: "4vh" },
                          },
                          null,
                          -1
                        ),
                        createTextVNode(" مذاق النبلاء للمأكولات ", -1),
                      ])),
                  ]),
                  _: 1,
                }
              ),
              createVNode(
                _component_router_link,
                {
                  to: "/sweets-restaurant",
                  class: "nav-item",
                },
                {
                  default: withCtx(() => [
                    ...(_cache[17] ||
                      (_cache[17] = [
                        createBaseVNode(
                          "img",
                          {
                            src: _imports_5,
                            style: { height: "4vh" },
                          },
                          null,
                          -1
                        ),
                        createTextVNode(" مذاق الأندلس للحلويات ", -1),
                      ])),
                  ]),
                  _: 1,
                }
              ),
              createVNode(
                _component_router_link,
                {
                  to: "/special-orders",
                  class: "nav-item",
                },
                {
                  default: withCtx(() => [
                    ...(_cache[18] ||
                      (_cache[18] = [
                        createBaseVNode(
                          "img",
                          {
                            src: _imports_6,
                            style: { height: "4vh" },
                          },
                          null,
                          -1
                        ),
                        createTextVNode(" عروض المناسبات والحفلات ", -1),
                      ])),
                  ]),
                  _: 1,
                }
              ),
            ]),
            createBaseVNode("div", _hoisted_9$4, [
              createBaseVNode(
                "a",
                {
                  href: "#",
                  onClick:
                    _cache[2] ||
                    (_cache[2] = withModifiers(
                      ($event) => ($data.isModalOpen = true),
                      ["prevent"]
                    )),
                  class: "nav-item",
                },
                [
                  ...(_cache[19] ||
                    (_cache[19] = [
                      createBaseVNode(
                        "img",
                        {
                          src: _imports_2$4,
                          alt: "",
                        },
                        null,
                        -1
                      ),
                      createTextVNode(" سجل بياناتك ", -1),
                    ])),
                ]
              ),
              createVNode(
                _component_router_link,
                {
                  to: "/Contact",
                  class: "nav-item",
                },
                {
                  default: withCtx(() => [
                    ...(_cache[20] ||
                      (_cache[20] = [
                        createBaseVNode(
                          "img",
                          {
                            src: _imports_3$4,
                            alt: "",
                          },
                          null,
                          -1
                        ),
                        createTextVNode("اتصل بنا", -1),
                      ])),
                  ]),
                  _: 1,
                }
              ),
            ]),
            createBaseVNode("div", _hoisted_10$3, [
              createVNode(
                _component_router_link,
                {
                  to: "/Orders",
                  class: "nav-item cart-icon",
                },
                {
                  default: withCtx(() => [
                    _cache[21] ||
                      (_cache[21] = createBaseVNode(
                        "img",
                        {
                          src: _imports_7,
                          alt: "",
                        },
                        null,
                        -1
                      )),
                    _cache[22] ||
                      (_cache[22] = createTextVNode(" عربة التسوق ", -1)),
                    $setup.count > 0
                      ? (openBlock(),
                        createElementBlock(
                          "span",
                          _hoisted_11$3,
                          toDisplayString($setup.count),
                          1
                        ))
                      : createCommentVNode("", true),
                    _cache[23] ||
                      (_cache[23] = createBaseVNode(
                        "img",
                        {
                          src: _imports_1$4,
                          alt: "",
                        },
                        null,
                        -1
                      )),
                  ]),
                  _: 1,
                }
              ),
            ]),
          ]),
        ]),
        createVNode(
          _component_LocationModal,
          {
            visible: $data.isModalOpen,
            "onUpdate:visible":
              _cache[3] ||
              (_cache[3] = ($event) => ($data.isModalOpen = $event)),
          },
          null,
          8,
          ["visible"]
        ),
      ],
      64
    )
  );
}
const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$b, [
  ["render", _sfc_render$5],
  ["__scopeId", "data-v-f7c33a02"],
]);
const _hoisted_1$8 = { class: "footer" };
const _hoisted_2$6 = { class: "footer-bottom" };
const _sfc_main$a = /* @__PURE__ */ Object.assign(
  { name: "AppFooter" },
  {
    __name: "Footer",
    setup(__props) {
      return (_ctx, _cache) => {
        return (
          openBlock(),
          createElementBlock("footer", _hoisted_1$8, [
            _cache[0] ||
              (_cache[0] = createBaseVNode(
                "div",
                { class: "footer-container" },
                [
                  createBaseVNode("div", { class: "footer-section about" }, [
                    createBaseVNode("h3", null, "عن حلويات الأندلس"),
                    createBaseVNode(
                      "p",
                      null,
                      " نقدم لك أشهى الحلويات الشرقية والغربية، وألذ الأكلات البيتية، مع إمكانية تنفيذ طلبات خاصة تُحضّر بحب وجودة عالية. "
                    ),
                    createBaseVNode("h3", null, "منتجاتنا "),
                    createBaseVNode("ul", null, [
                      createBaseVNode("li", null, "حلويات غربية "),
                      createBaseVNode("li", null, "حلويات شرقية "),
                      createBaseVNode("li", null, "مأكولات بأنواعها"),
                      createBaseVNode("li", null, " طلبات خاصة للحفلات"),
                    ]),
                  ]),
                  createBaseVNode(
                    "div",
                    { class: "footer-section branches-map" },
                    [
                      createBaseVNode(
                        "h3",
                        null,
                        " فروعنا - المملكة العربية السعودية"
                      ),
                      createBaseVNode("div", { class: "branch-item" }, [
                        createBaseVNode(
                          "h4",
                          null,
                          "فرع الخضراء - حي الخضراء، مكة المكرمة"
                        ),
                        createBaseVNode("p", null, [
                          createBaseVNode("i", {
                            class: "fas fa-map-marker-alt",
                          }),
                          createTextVNode(" +966566956412"),
                        ]),
                      ]),
                      createBaseVNode("div", { class: "branch-item" }, [
                        createBaseVNode(
                          "h4",
                          null,
                          "فرع العوالي - Ibrahim Al Joufaili, مكة 24372"
                        ),
                        createBaseVNode("p", null, [
                          createBaseVNode("i", {
                            class: "fas fa-map-marker-alt",
                          }),
                          createTextVNode("+966125666555 "),
                        ]),
                      ]),
                      createBaseVNode("div", { class: "branch-item" }, [
                        createBaseVNode(
                          "h4",
                          null,
                          "فرع الشرائع - 8144 المهندس عمر قاضي، الخضراء، مكة "
                        ),
                        createBaseVNode("p", null, [
                          createBaseVNode("i", {
                            class: "fas fa-map-marker-alt",
                          }),
                          createTextVNode(" +966125666555"),
                        ]),
                      ]),
                      createBaseVNode("div", { class: "branch-item" }, [
                        createBaseVNode(
                          "h4",
                          null,
                          "فرع النوارية -العمرة الجديدة، مكة 24416"
                        ),
                        createBaseVNode("p", null, [
                          createBaseVNode("i", {
                            class: "fas fa-map-marker-alt",
                          }),
                          createTextVNode(" +966566756481"),
                        ]),
                      ]),
                      createBaseVNode("div", { class: "branch-item" }, [
                        createBaseVNode(
                          "h4",
                          null,
                          "فرع الستين - 7730 قصر الضيافة، الزهراء، مكة 24225"
                        ),
                        createBaseVNode("p", null, [
                          createBaseVNode("i", {
                            class: "fas fa-map-marker-alt",
                          }),
                          createTextVNode(" +966566956895"),
                        ]),
                      ]),
                    ]
                  ),
                  createBaseVNode(
                    "div",
                    { class: "footer-section branches-map" },
                    [
                      createBaseVNode("h3", null, "موقعنا"),
                      createBaseVNode("div", { class: "branches-list" }, [
                        createBaseVNode("div", { class: "map-box" }, [
                          createBaseVNode("iframe", {
                            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.6688259916573!2d39.91637687496799!3d21.473513080232166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c2011b1f773495%3A0x3b4a7e175a5a9267!2z2K3ZhNmI2YrYp9iqINin2YTYo9mG2K_ZhNizIC0g2YHYsdi5INin2YTYrtiu2LHYp9ih!5e0!3m2!1sar!2seg!4v1700000000000",
                            width: "100%",
                            height: "100%",
                            style: { border: "0" },
                            allowfullscreen: "",
                            loading: "lazy",
                            referrerpolicy: "no-referrer-when-downgrade",
                          }),
                        ]),
                      ]),
                    ]
                  ),
                ],
                -1
              )),
            createBaseVNode("div", _hoisted_2$6, [
              createBaseVNode(
                "p",
                null,
                toDisplayString(/* @__PURE__ */ new Date().getFullYear()) +
                  " © جميع الحقوق محفوظة - حلويات الأندلس",
                1
              ),
            ]),
          ])
        );
      };
    },
  }
);
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$a, [
  ["__scopeId", "data-v-837333b0"],
]);
const _sfc_main$9 = {
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(LocationModal),
            createVNode(NavBar),
            createVNode(_component_router_view),
            createVNode(Footer),
          ],
          64
        )
      );
    };
  },
};
const _imports_0$4 = "/assets/videos/sweets/sweets_slideshow.mp4";
const _imports_1$3 = "/assets/videos/home/chef-icon.mp4";
const _hoisted_1$7 = {
  class: "home",
  id: "home",
};
const _sfc_main$8 = /* @__PURE__ */ Object.assign(
  { name: "HomeView" },
  {
    __name: "Home",
    setup(__props) {
      return (_ctx, _cache) => {
        return (
          openBlock(),
          createElementBlock("div", _hoisted_1$7, [
            ...(_cache[0] ||
              (_cache[0] = [
                createBaseVNode(
                  "video",
                  {
                    src: _imports_0$4,
                    class: "intro-video",
                    autoplay: "",
                    loop: "",
                    muted: "",
                    preload: "metadata",
                    playsinline: "",
                  },
                  null,
                  -1
                ),
                createBaseVNode("div", { class: "hr" }, null, -1),
                createBaseVNode(
                  "div",
                  { class: "hero-section" },
                  [
                    createBaseVNode("div", { class: "hero-banner" }, [
                      createBaseVNode("div", { class: "hero-content" }, [
                        createBaseVNode("div", { class: "hero-text" }, [
                          createBaseVNode(
                            "h1",
                            { class: "hero-title" },
                            "من قلب الأندلس:. نقدم لك"
                          ),
                          createBaseVNode(
                            "p",
                            { class: "hero-subtitle" },
                            "لوحات من الحلو والسعادة"
                          ),
                          createBaseVNode(
                            "a",
                            {
                              href: "#menu",
                              class: "cta-button",
                            },
                            " 🛒 اطلب الآن "
                          ),
                        ]),
                        createBaseVNode("div", { class: "hero-image" }, [
                          createBaseVNode("img", {
                            src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
                            alt: "كيك لذيذ",
                            class: "cake-img",
                          }),
                        ]),
                      ]),
                    ]),
                    createBaseVNode("div", { class: "description-section" }, [
                      createBaseVNode("div", { class: "container" }, [
                        createBaseVNode(
                          "p",
                          { class: "description-text" },
                          " منصة متكاملة تجمع بين فن الطهي والحلا، حيث يمكنك اختيار من قائمة متنوعة من الأكلات والحلويات أو إرسال طلب خاص يُحضّر حسب ذوقك وبأفضل المكونات. "
                        ),
                      ]),
                    ]),
                    createBaseVNode(
                      "div",
                      {
                        class: "order-section",
                        id: "menu",
                      },
                      [
                        createBaseVNode("div", { class: "container" }, [
                          createBaseVNode("div", { class: "chef-container" }, [
                            createBaseVNode("div", { class: "chef-circle" }, [
                              createBaseVNode("video", {
                                src: _imports_1$3,
                                class: "chef-video",
                                autoplay: "",
                                loop: "",
                                muted: "",
                                preload: "metadata",
                                playsinline: "",
                              }),
                            ]),
                            createBaseVNode(
                              "h2",
                              { class: "order-title" },
                              "جاهز للطلب؟"
                            ),
                            createBaseVNode(
                              "p",
                              { class: "order-subtitle" },
                              "اختر من قائمتنا المميزة"
                            ),
                            createBaseVNode(
                              "a",
                              {
                                href: "#home",
                                class: "order-button",
                              },
                              [
                                createBaseVNode(
                                  "span",
                                  { class: "button-icon" },
                                  "🛒"
                                ),
                                createBaseVNode(
                                  "span",
                                  { class: "button-text" },
                                  "اطلب الآن"
                                ),
                              ]
                            ),
                          ]),
                        ]),
                      ]
                    ),
                  ],
                  -1
                ),
              ])),
          ])
        );
      };
    },
  }
);
const Home = /* @__PURE__ */ _export_sfc(_sfc_main$8, [
  ["__scopeId", "data-v-9d097b27"],
]);
const _imports_0$3 = "/assets/videos/food/foods_slideshow.mp4";
const _imports_2$2 = "/assets/images/food/bannar1.png";
const _imports_3$2 = "/assets/images/food/banner5.png";
const _sfc_main$7 = {
  name: "FoodRestaurant",
  setup() {
    const { addToCart } = useCart();
    return { addToCart };
  },
  data() {
    return {
      selectedCategory: null,
      products: [
        {
          id: 1,
          name: "أرز دجاج",
          price: 45,
          category: "دواجن",
          image: "/assets/images/food/food1.png",
        },
        {
          id: 2,
          name: "كبسة لحم",
          price: 55,
          category: "لحوم",
          image: "/assets/images/food/food3.png",
        },
        {
          id: 3,
          name: "مندي دجاج",
          price: 40,
          category: "دواجن",
          image: "/assets/images/food/food2.jpg",
        },
        {
          id: 4,
          name: "مظبي لحم",
          price: 60,
          category: "لحوم",
          image: "/assets/images/food/food3.png",
        },
        {
          id: 5,
          name: "برياني دجاج",
          price: 38,
          category: "دواجن",
          image: "/assets/images/food/food1.png",
        },
        {
          id: 6,
          name: "مشوي مشكل",
          price: 70,
          category: "لحوم",
          image: "/assets/images/food/food2.jpg",
        },
        {
          id: 7,
          name: "دجاج مشوي",
          price: 35,
          category: "دواجن",
          image: "/assets/images/food/food3.png",
        },
        {
          id: 8,
          name: "ريش مشوي",
          price: 65,
          category: "لحوم",
          image: "/assets/images/food/food3.jpg",
        },
        {
          id: 9,
          name: "حمص باللحمة",
          price: 30,
          category: "مقبلات",
          image: "/assets/images/food/food1.png",
        },
        {
          id: 10,
          name: "فتوش",
          price: 20,
          category: "مقبلات",
          image: "/assets/images/food/food2.jpg",
        },
        {
          id: 11,
          name: "متبل",
          price: 15,
          category: "مقبلات",
          image: "/assets/images/food/food3.png",
        },
        {
          id: 12,
          name: "فطيرة جبن",
          price: 25,
          category: "فطائر",
          image: "/assets/images/food/food1.png",
        },
        {
          id: 13,
          name: "فطيرة زعتر",
          price: 20,
          category: "فطائر",
          image: "/assets/images/food/food2.jpg",
        },
        {
          id: 14,
          name: "فطيرة لحم",
          price: 30,
          category: "فطائر",
          image: "/assets/images/food/food3.png",
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory) return this.products;
      return this.products.filter((p) => p.category === this.selectedCategory);
    },
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.$nextTick(() => {
        const section = document.getElementById("products-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    },
  },
  mounted() {
    document.title = "مذاق النبلاء - اسم مطعمك";
  },
};
const _hoisted_1$6 = { class: "content" };
const _hoisted_2$5 = { class: "parts-section" };
const _hoisted_3$5 = { class: "container" };
const _hoisted_4$5 = {
  key: 0,
  id: "products-section",
  class: "category-products-section",
};
const _hoisted_5$4 = { class: "category-video-container" };
const _hoisted_6$4 = ["src"];
const _hoisted_7$4 = { class: "category-title" };
const _hoisted_8$3 = {
  class: "container",
  id: "pruducts-section",
};
const _hoisted_9$3 = { class: "card-info" };
const _hoisted_10$2 = ["onClick"];
const _hoisted_11$2 = { class: "more-btn" };
const _hoisted_12$1 = { key: 1 };
const _hoisted_13$1 = {
  class: "container",
  id: "pruducts-section",
};
const _hoisted_14$1 = { class: "card-info" };
const _hoisted_15$1 = ["onClick"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return (
    openBlock(),
    createElementBlock(
      Fragment,
      null,
      [
        _cache[12] ||
          (_cache[12] = createBaseVNode(
            "section",
            { class: "hero-section" },
            [
              createBaseVNode("div", { class: "food-slider" }, [
                createBaseVNode("video", {
                  class: "hero-video",
                  src: _imports_0$3,
                  autoplay: "",
                  loop: "",
                  muted: "",
                  playsinline: "",
                  style: {
                    width: "100%",
                    height: "100%",
                    "object-fit": "cover",
                    "border-radius": "8px",
                  },
                }),
              ]),
              createBaseVNode("div", { class: "hero-content" }, [
                createBaseVNode("h1", { class: "hero-title" }, [
                  createTextVNode(" مذاق النبلاء .... "),
                  createBaseVNode("br"),
                  createTextVNode(" كل وجبة حكاية من التميز "),
                ]),
                createBaseVNode("a", { href: "#products-section" }, [
                  createBaseVNode(
                    "button",
                    { class: "order-button order-button--fixed" },
                    [
                      createTextVNode(" اطلب الآن"),
                      createBaseVNode("img", {
                        src: _imports_1$4,
                        alt: "",
                      }),
                    ]
                  ),
                ]),
              ]),
            ],
            -1
          )),
        createBaseVNode("section", _hoisted_1$6, [
          createBaseVNode("section", _hoisted_2$5, [
            _cache[8] ||
              (_cache[8] = createBaseVNode(
                "img",
                {
                  src: _imports_2$2,
                  alt: "border",
                  class: "caption-image",
                },
                null,
                -1
              )),
            createBaseVNode("div", _hoisted_3$5, [
              createBaseVNode(
                "div",
                {
                  class: "card card-1",
                  onClick:
                    _cache[0] ||
                    (_cache[0] = ($event) => $options.selectCategory("مقبلات")),
                },
                [
                  ...(_cache[4] ||
                    (_cache[4] = [
                      createBaseVNode("button", null, "مقبلات", -1),
                    ])),
                ]
              ),
              createBaseVNode(
                "div",
                {
                  class: "card card-2",
                  onClick:
                    _cache[1] ||
                    (_cache[1] = ($event) => $options.selectCategory("لحوم")),
                },
                [
                  ...(_cache[5] ||
                    (_cache[5] = [
                      createBaseVNode("button", null, "لحوم", -1),
                    ])),
                ]
              ),
              createBaseVNode(
                "div",
                {
                  class: "card card-3",
                  onClick:
                    _cache[2] ||
                    (_cache[2] = ($event) => $options.selectCategory("دواجن")),
                },
                [
                  ...(_cache[6] ||
                    (_cache[6] = [
                      createBaseVNode("button", null, "دواجن", -1),
                    ])),
                ]
              ),
              createBaseVNode(
                "div",
                {
                  class: "card card-4",
                  onClick:
                    _cache[3] ||
                    (_cache[3] = ($event) => $options.selectCategory("فطائر")),
                },
                [
                  ...(_cache[7] ||
                    (_cache[7] = [
                      createBaseVNode("button", null, "فطائر", -1),
                    ])),
                ]
              ),
            ]),
          ]),
          $data.selectedCategory
            ? (openBlock(),
              createElementBlock("section", _hoisted_4$5, [
                _cache[9] ||
                  (_cache[9] = createBaseVNode(
                    "img",
                    {
                      src: _imports_3$2,
                      class: "caption-image",
                    },
                    null,
                    -1
                  )),
                createBaseVNode(
                  "h2",
                  _hoisted_7$4,
                  toDisplayString($data.selectedCategory),
                  1
                ),
                createBaseVNode("div", _hoisted_8$3, [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList($options.filteredProducts, (product) => {
                      return (
                        openBlock(),
                        createElementBlock(
                          "div",
                          {
                            class: normalizeClass([
                              "card",
                              `card-${(product.id % 6) + 1}`,
                            ]),
                            key: product.id,
                          },
                          [
                            createBaseVNode("div", _hoisted_9$3, [
                              createBaseVNode(
                                "p",
                                null,
                                toDisplayString(product.name),
                                1
                              ),
                              createBaseVNode(
                                "p",
                                null,
                                toDisplayString(product.price) + " ريال",
                                1
                              ),
                            ]),
                            createBaseVNode(
                              "button",
                              {
                                onClick: ($event) => $setup.addToCart(product),
                              },
                              "أضف",
                              8,
                              _hoisted_10$2
                            ),
                          ],
                          2
                        )
                      );
                    }),
                    128
                  )),
                ]),
                createVNode(
                  _component_router_link,
                  { to: "/food-restaurant" },
                  {
                    default: withCtx(() => [
                      createBaseVNode(
                        "button",
                        _hoisted_11$2,
                        "عرض المزيد من " +
                          toDisplayString($data.selectedCategory),
                        1
                      ),
                    ]),
                    _: 1,
                  }
                ),
              ]))
            : (openBlock(),
              createElementBlock("section", _hoisted_12$1, [
                _cache[11] ||
                  (_cache[11] = createBaseVNode(
                    "img",
                    {
                      src: _imports_3$2,
                      class: "caption-image",
                    },
                    null,
                    -1
                  )),
                createBaseVNode("div", _hoisted_13$1, [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList($data.products.slice(0, 8), (product) => {
                      return (
                        openBlock(),
                        createElementBlock(
                          "div",
                          {
                            class: normalizeClass([
                              "card",
                              `card-${(product.id % 6) + 1}`,
                            ]),
                            key: product.id,
                          },
                          [
                            createBaseVNode("div", _hoisted_14$1, [
                              createBaseVNode(
                                "p",
                                null,
                                toDisplayString(product.name),
                                1
                              ),
                              createBaseVNode(
                                "p",
                                null,
                                toDisplayString(product.price) + " ريال",
                                1
                              ),
                            ]),
                            createBaseVNode(
                              "button",
                              {
                                onClick: ($event) => $setup.addToCart(product),
                              },
                              "أضف",
                              8,
                              _hoisted_15$1
                            ),
                          ],
                          2
                        )
                      );
                    }),
                    128
                  )),
                ]),
                createVNode(
                  _component_router_link,
                  { to: "/food-restaurant" },
                  {
                    default: withCtx(() => [
                      ...(_cache[10] ||
                        (_cache[10] = [
                          createBaseVNode(
                            "button",
                            { class: "more-btn" },
                            "عرض المزيد",
                            -1
                          ),
                        ])),
                    ]),
                    _: 1,
                  }
                ),
              ])),
        ]),
      ],
      64
    )
  );
}
const FoodRestaurant = /* @__PURE__ */ _export_sfc(_sfc_main$7, [
  ["render", _sfc_render$4],
  ["__scopeId", "data-v-2e1210db"],
]);
const _sfc_main$6 = {
  name: "FoodRestaurant",
  setup() {
    const { addToCart } = useCart();
    return { addToCart };
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: " كيك",
          price: 45,
          image: "/assets/images/sweets/cake.jpg",
        },
        {
          id: 2,
          name: "كحك ",
          price: 55,
          image: "/assets/images/sweets/kaa7k.jpg",
        },
        {
          id: 3,
          name: " كنافة",
          price: 40,
          image: "/assets/images/sweets/konafa.jpg",
        },
        {
          id: 4,
          name: " كحك",
          price: 60,
          image: "/assets/images/sweets/kaa7k.jpg",
        },
        {
          id: 5,
          name: " كحك",
          price: 38,
          image: "/assets/images/sweets/cake.jpg",
        },
        {
          id: 6,
          name: " جلاش",
          price: 70,
          image: "/assets/images/sweets/sweet2.png",
        },
        {
          id: 7,
          name: " كيك",
          price: 35,
          image: "/assets/images/sweets/kaa7k.jpg",
        },
        {
          id: 8,
          name: " كحك",
          price: 65,
          image: "/assets/images/sweets/sweet2.png",
        },
      ],
    };
  },
  mounted() {
    document.title = "مذاق الأندلس للحلويات";
  },
};
const _hoisted_1$5 = { class: "content" };
const _hoisted_2$4 = { class: "products-container" };
const _hoisted_3$4 = { class: "product-card-content" };
const _hoisted_4$4 = { class: "product-card-info" };
const _hoisted_5$3 = { class: "product-name" };
const _hoisted_6$3 = { class: "product-price" };
const _hoisted_7$3 = ["onClick"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return (
    openBlock(),
    createElementBlock(
      Fragment,
      null,
      [
        _cache[2] ||
          (_cache[2] = createBaseVNode(
            "section",
            { class: "hero-section" },
            [
              createBaseVNode("div", { class: "food-slider" }, [
                createBaseVNode("video", {
                  class: "hero-video",
                  src: _imports_0$4,
                  autoplay: "",
                  loop: "",
                  muted: "",
                  playsinline: "",
                  style: {
                    width: "100%",
                    height: "100%",
                    "object-fit": "cover",
                    "border-radius": "8px",
                  },
                }),
              ]),
              createBaseVNode("div", { class: "hero-content" }, [
                createBaseVNode("h1", { class: "hero-title" }, [
                  createTextVNode(" حلويات الاندلس .... "),
                  createBaseVNode("br"),
                  createTextVNode(" لحظات من الحلا و السعادة "),
                ]),
                createBaseVNode("a", { href: "#pruducts-section" }, [
                  createBaseVNode(
                    "button",
                    { class: "order-button order-button--fixed" },
                    [
                      createTextVNode(" اطلب الآن"),
                      createBaseVNode("img", {
                        src: _imports_1$4,
                        alt: "",
                      }),
                    ]
                  ),
                ]),
              ]),
            ],
            -1
          )),
        createBaseVNode("section", _hoisted_1$5, [
          _cache[1] ||
            (_cache[1] = createStaticVNode(
              '<section class="parts-section" data-v-6dad0740><img src="' +
                _imports_2$2 +
                '" alt="border" class="caption-image" data-v-6dad0740><div class="parts-container" data-v-6dad0740><div class="parts-card parts-card-1" data-v-6dad0740><button data-v-6dad0740>جلاش</button></div><div class="parts-card parts-card-2" data-v-6dad0740><button data-v-6dad0740>كيك</button></div><div class="parts-card parts-card-3" data-v-6dad0740><button data-v-6dad0740>كحك</button></div><div class="parts-card parts-card-4" data-v-6dad0740><button data-v-6dad0740>كنافة</button></div></div></section><img src="' +
                _imports_3$2 +
                '" class="caption-image" data-v-6dad0740>',
              2
            )),
          createBaseVNode("div", _hoisted_2$4, [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList($data.products, (product) => {
                return (
                  openBlock(),
                  createElementBlock(
                    "div",
                    {
                      class: normalizeClass([
                        "product-card",
                        `product-card-${(product.id % 6) + 1}`,
                      ]),
                      key: product.id,
                    },
                    [
                      createBaseVNode("div", _hoisted_3$4, [
                        createBaseVNode("div", _hoisted_4$4, [
                          createBaseVNode(
                            "p",
                            _hoisted_5$3,
                            toDisplayString(product.name),
                            1
                          ),
                          createBaseVNode(
                            "p",
                            _hoisted_6$3,
                            toDisplayString(product.price) + " ريال",
                            1
                          ),
                        ]),
                        createBaseVNode(
                          "button",
                          {
                            class: "add-to-cart-btn",
                            onClick: ($event) => $setup.addToCart(product),
                          },
                          "أضف للسلة",
                          8,
                          _hoisted_7$3
                        ),
                      ]),
                    ],
                    2
                  )
                );
              }),
              128
            )),
          ]),
          createVNode(
            _component_router_link,
            { to: "/food-restaurant" },
            {
              default: withCtx(() => [
                ...(_cache[0] ||
                  (_cache[0] = [
                    createBaseVNode(
                      "button",
                      { class: "more-btn" },
                      "عرض المزيد",
                      -1
                    ),
                  ])),
              ]),
              _: 1,
            }
          ),
        ]),
      ],
      64
    )
  );
}
const SweetsRestaurant = /* @__PURE__ */ _export_sfc(_sfc_main$6, [
  ["render", _sfc_render$3],
  ["__scopeId", "data-v-6dad0740"],
]);
const _imports_0$2 = "/assets/images/sweets/banner4.png";
const _hoisted_1$4 = {
  class: "cart-container",
  dir: "rtl",
};
const _hoisted_2$3 = { class: "cart-table-wrapper" };
const _hoisted_3$3 = { class: "cart-table" };
const _hoisted_4$3 = { class: "qty-controls" };
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$2 = ["onClick", "disabled"];
const _hoisted_7$2 = { class: "product-info" };
const _hoisted_8$2 = ["src", "alt"];
const _hoisted_9$2 = ["onClick"];
const _hoisted_10$1 = { class: "mobile-cards" };
const _hoisted_11$1 = { class: "card-top" };
const _hoisted_12 = ["src", "alt"];
const _hoisted_13 = { class: "card-info" };
const _hoisted_14 = { class: "qty-controls" };
const _hoisted_15 = ["onClick"];
const _hoisted_16 = ["onClick", "disabled"];
const _hoisted_17 = ["onClick"];
const _hoisted_18 = {
  key: 0,
  class: "total-section",
};
const _hoisted_19 = { class: "total-row" };
const _hoisted_20 = {
  key: 1,
  class: "empty-cart",
};
const _sfc_main$5 = /* @__PURE__ */ Object.assign(
  { name: "OrdersView" },
  {
    __name: "Orders",
    setup(__props) {
      const cart2 = ref([]);
      onMounted(() => {
        const saved = localStorage.getItem("cart");
        cart2.value = saved ? JSON.parse(saved) : [];
      });
      const removeItem = (id) => {
        cart2.value = cart2.value.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart2.value));
      };
      const increaseQty = (id) => {
        const item = cart2.value.find((i) => i.id === id);
        if (item) item.qty += 1;
        localStorage.setItem("cart", JSON.stringify(cart2.value));
      };
      const decreaseQty = (id) => {
        const item = cart2.value.find((i) => i.id === id);
        if (item && item.qty > 1) item.qty -= 1;
        localStorage.setItem("cart", JSON.stringify(cart2.value));
      };
      const getTotalPrice = () => {
        return cart2.value.reduce(
          (total, item) => total + item.price * item.qty,
          0
        );
      };
      return (_ctx, _cache) => {
        const _component_router_link = resolveComponent("router-link");
        return (
          openBlock(),
          createElementBlock("div", _hoisted_1$4, [
            _cache[6] ||
              (_cache[6] = createBaseVNode(
                "img",
                {
                  src: _imports_0$2,
                  alt: "shopping -basket",
                  class: "cart-title",
                },
                null,
                -1
              )),
            createBaseVNode("div", _hoisted_2$3, [
              createBaseVNode("table", _hoisted_3$3, [
                _cache[1] ||
                  (_cache[1] = createBaseVNode(
                    "thead",
                    null,
                    [
                      createBaseVNode("tr", null, [
                        createBaseVNode("th", null, "الكمية"),
                        createBaseVNode("th", null, "السعر"),
                        createBaseVNode("th", null, "المنتج"),
                        createBaseVNode("th", null, "حذف"),
                      ]),
                    ],
                    -1
                  )),
                createBaseVNode("tbody", null, [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(cart2.value, (item) => {
                      return (
                        openBlock(),
                        createElementBlock(
                          "tr",
                          {
                            key: item.id,
                          },
                          [
                            createBaseVNode("td", null, [
                              createBaseVNode("div", _hoisted_4$3, [
                                createBaseVNode(
                                  "button",
                                  {
                                    onClick: ($event) => increaseQty(item.id),
                                  },
                                  "+",
                                  8,
                                  _hoisted_5$2
                                ),
                                createBaseVNode(
                                  "span",
                                  null,
                                  toDisplayString(item.qty),
                                  1
                                ),
                                createBaseVNode(
                                  "button",
                                  {
                                    onClick: ($event) => decreaseQty(item.id),
                                    disabled: item.qty <= 1,
                                  },
                                  [
                                    ...(_cache[0] ||
                                      (_cache[0] = [
                                        createBaseVNode(
                                          "img",
                                          {
                                            src: "",
                                            alt: "",
                                          },
                                          null,
                                          -1
                                        ),
                                        createTextVNode("-", -1),
                                      ])),
                                  ],
                                  8,
                                  _hoisted_6$2
                                ),
                              ]),
                            ]),
                            createBaseVNode(
                              "td",
                              null,
                              toDisplayString(item.price.toFixed(2)) + " ريال",
                              1
                            ),
                            createBaseVNode("td", _hoisted_7$2, [
                              createBaseVNode(
                                "span",
                                null,
                                toDisplayString(item.name),
                                1
                              ),
                              createBaseVNode(
                                "img",
                                {
                                  src: item.image,
                                  alt: item.name,
                                },
                                null,
                                8,
                                _hoisted_8$2
                              ),
                            ]),
                            createBaseVNode("td", null, [
                              createBaseVNode(
                                "button",
                                {
                                  class: "delete-btn",
                                  onClick: ($event) => removeItem(item.id),
                                },
                                "x",
                                8,
                                _hoisted_9$2
                              ),
                            ]),
                          ]
                        )
                      );
                    }),
                    128
                  )),
                ]),
              ]),
            ]),
            createBaseVNode("div", _hoisted_10$1, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(cart2.value, (item) => {
                  return (
                    openBlock(),
                    createElementBlock(
                      "div",
                      {
                        key: item.id,
                        class: "card",
                      },
                      [
                        createBaseVNode("div", _hoisted_11$1, [
                          createBaseVNode(
                            "img",
                            {
                              src: item.image,
                              alt: item.name,
                            },
                            null,
                            8,
                            _hoisted_12
                          ),
                          createBaseVNode("div", _hoisted_13, [
                            createBaseVNode(
                              "h3",
                              null,
                              toDisplayString(item.name),
                              1
                            ),
                            createBaseVNode(
                              "p",
                              null,
                              "السعر: " +
                                toDisplayString(item.price.toFixed(2)) +
                                " ريال",
                              1
                            ),
                            createBaseVNode("div", _hoisted_14, [
                              _cache[2] ||
                                (_cache[2] = createBaseVNode(
                                  "span",
                                  null,
                                  "الكمية:",
                                  -1
                                )),
                              createBaseVNode(
                                "button",
                                {
                                  onClick: ($event) => increaseQty(item.id),
                                },
                                "+",
                                8,
                                _hoisted_15
                              ),
                              createBaseVNode(
                                "span",
                                null,
                                toDisplayString(item.qty),
                                1
                              ),
                              createBaseVNode(
                                "button",
                                {
                                  onClick: ($event) => decreaseQty(item.id),
                                  disabled: item.qty <= 1,
                                },
                                "-",
                                8,
                                _hoisted_16
                              ),
                            ]),
                          ]),
                          createBaseVNode(
                            "button",
                            {
                              class: "delete-btn",
                              onClick: ($event) => removeItem(item.id),
                            },
                            "x",
                            8,
                            _hoisted_17
                          ),
                        ]),
                      ]
                    )
                  );
                }),
                128
              )),
            ]),
            cart2.value.length > 0
              ? (openBlock(),
                createElementBlock("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    _cache[3] ||
                      (_cache[3] = createBaseVNode(
                        "span",
                        null,
                        "المجموع الكلي:",
                        -1
                      )),
                    createBaseVNode(
                      "span",
                      null,
                      toDisplayString(getTotalPrice().toFixed(2)) + " ريال",
                      1
                    ),
                  ]),
                  createVNode(
                    _component_router_link,
                    { to: "/Checkout" },
                    {
                      default: withCtx(() => [
                        ...(_cache[4] ||
                          (_cache[4] = [
                            createBaseVNode(
                              "button",
                              { class: "checkout-btn" },
                              "إتمام الطلب",
                              -1
                            ),
                          ])),
                      ]),
                      _: 1,
                    }
                  ),
                ]))
              : (openBlock(),
                createElementBlock("div", _hoisted_20, [
                  ...(_cache[5] ||
                    (_cache[5] = [
                      createBaseVNode("p", null, "السلة فارغة", -1),
                    ])),
                ])),
          ])
        );
      };
    },
  }
);
const Orders = /* @__PURE__ */ _export_sfc(_sfc_main$5, [
  ["__scopeId", "data-v-33b756cf"],
]);
const _sfc_main$4 = /* @__PURE__ */ Object.assign(
  { name: "ProfileView" },
  {
    __name: "Profile",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("h1", null, "profile");
      };
    },
  }
);
const _imports_0$1 = "/assets/images/login/left.png";
const _imports_1$1 = "/assets/images/login/right.png";
const _imports_2$1 = "/assets/images/login/logo1.png";
const _imports_3$1 = "/assets/images/login/logo3.jpg";
const _sfc_main$3 = {
  name: "LoginView",
  data() {
    return {
      loginType: "phone",
      phone: "",
    };
  },
};
const _hoisted_1$3 = { class: "login-container" };
const _hoisted_2$2 = { class: "login-content" };
const _hoisted_3$2 = { class: "switch-buttons" };
const _hoisted_4$2 = { class: "input-group" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$3, [
      _cache[5] ||
        (_cache[5] = createBaseVNode(
          "img",
          {
            src: _imports_0$1,
            class: "side-img left-img",
            alt: "left",
          },
          null,
          -1
        )),
      _cache[6] ||
        (_cache[6] = createBaseVNode(
          "img",
          {
            src: _imports_1$1,
            class: "side-img right-img",
            alt: "right",
          },
          null,
          -1
        )),
      createBaseVNode("div", _hoisted_2$2, [
        _cache[2] ||
          (_cache[2] = createBaseVNode(
            "h2",
            { class: "title" },
            "تسجيل الدخول",
            -1
          )),
        createBaseVNode("div", _hoisted_3$2, [
          createBaseVNode(
            "span",
            {
              class: normalizeClass({ active: $data.loginType === "phone" }),
              onClick:
                _cache[0] ||
                (_cache[0] = ($event) => ($data.loginType = "phone")),
            },
            " استخدام رقم الهاتف ",
            2
          ),
        ]),
        createBaseVNode("div", _hoisted_4$2, [
          $data.loginType === "phone"
            ? withDirectives(
                (openBlock(),
                createElementBlock(
                  "input",
                  {
                    key: 0,
                    type: "text",
                    "onUpdate:modelValue":
                      _cache[1] ||
                      (_cache[1] = ($event) => ($data.phone = $event)),
                    placeholder: "+962",
                  },
                  null,
                  512
                )),
                [[vModelText, $data.phone]]
              )
            : createCommentVNode("", true),
        ]),
        _cache[3] ||
          (_cache[3] = createBaseVNode(
            "button",
            { class: "submit-btn" },
            "استمر →",
            -1
          )),
        _cache[4] ||
          (_cache[4] = createBaseVNode(
            "div",
            { class: "footer-logos" },
            [
              createBaseVNode("img", { src: _imports_2$1 }),
              createBaseVNode("img", { src: _imports_3$1 }),
            ],
            -1
          )),
      ]),
    ])
  );
}
const Login = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
  ["render", _sfc_render$2],
  ["__scopeId", "data-v-41537897"],
]);
const _hoisted_1$2 = { class: "login-link" };
const _sfc_main$2 = /* @__PURE__ */ Object.assign(
  { name: "CheckoutView" },
  {
    __name: "Checkout",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_router_link = resolveComponent("router-link");
        return (
          openBlock(),
          createElementBlock(
            Fragment,
            null,
            [
              createBaseVNode("p", _hoisted_1$2, [
                _cache[1] || (_cache[1] = createTextVNode("عميل سابق؟ ", -1)),
                createVNode(
                  _component_router_link,
                  { to: "/Login" },
                  {
                    default: withCtx(() => [
                      ...(_cache[0] ||
                        (_cache[0] = [
                          createTextVNode("انقر هنا لتسجيل الدخول ", -1),
                        ])),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              _cache[2] ||
                (_cache[2] = createStaticVNode(
                  '<div class="checkout-container" data-v-fae199cb><div class="invoice-card" data-v-fae199cb><h3 data-v-fae199cb>تفاصيل الفاتورة</h3><div class="input-group" data-v-fae199cb><label data-v-fae199cb>الاسم *</label><input type="text" data-v-fae199cb></div><div class="input-group" data-v-fae199cb><label data-v-fae199cb>عنوان الشارع *</label><input type="text" data-v-fae199cb></div><div class="row" data-v-fae199cb><div class="input-group half" data-v-fae199cb><label data-v-fae199cb>المدينة *</label><input type="text" data-v-fae199cb></div><div class="input-group half" data-v-fae199cb><label data-v-fae199cb>المنطقة *</label><input type="text" data-v-fae199cb></div></div><div class="input-group" data-v-fae199cb><label data-v-fae199cb>رقم الهاتف *</label><input type="text" data-v-fae199cb></div><div class="input-group" data-v-fae199cb><label data-v-fae199cb>البريد الإلكتروني *</label><input type="email" data-v-fae199cb></div><div class="input-group" data-v-fae199cb><label data-v-fae199cb>ملاحظات الطلب</label><textarea rows="3" data-v-fae199cb></textarea></div></div><div class="payment-card" data-v-fae199cb><h3 data-v-fae199cb>طريقة الدفع</h3><div class="section-title" data-v-fae199cb><span data-v-fae199cb>بطاقات الائتمان الخاصة بك</span><button class="add-btn" data-v-fae199cb>+</button></div><div class="input-group" data-v-fae199cb><label data-v-fae199cb>رقم البطاقة</label><input type="text" placeholder="•••• •••• •••• ••••" data-v-fae199cb></div><div class="input-group" data-v-fae199cb><label data-v-fae199cb>الإسم على البطاقة</label><input type="text" placeholder="الاسم" data-v-fae199cb></div><div class="row" data-v-fae199cb><div class="input-group half" data-v-fae199cb><label data-v-fae199cb>تاريخ الإنتهاء</label><input type="text" placeholder="MM/YY" data-v-fae199cb></div><div class="input-group half" data-v-fae199cb><label data-v-fae199cb>CVV</label><input type="text" placeholder="000" data-v-fae199cb></div></div><button class="add-card-btn" data-v-fae199cb>+ أضف بطاقتك</button><div class="checkbox" data-v-fae199cb><input type="checkbox" id="cod" data-v-fae199cb><label for="cod" data-v-fae199cb>الدفع عند الاستلام</label></div><button class="submit-btn" data-v-fae199cb>إتمام الطلب</button></div></div>',
                  1
                )),
            ],
            64
          )
        );
      };
    },
  }
);
const Checkout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
  ["__scopeId", "data-v-fae199cb"],
]);
const _imports_0 = "/assets/images/contact/whatsapp.png";
const _imports_1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAgdJREFUeJztmr1qVUEURteOohJJZWxstLBIZWNhIQiKYiU2VhYWadP4DlZ5ArFQRHwFsRe0EKJtEFEDNv4UmmgQIX4Wpohw0TNnTvZ3D5lV79n7m8XMvfccbjAFSArgFHABOA8cB+aBI8AB4Mt26TqwBXwHPgIfgMcR8TA78yBImpF0RdKK+nO3JsP+oTZTiqQzwH1gwZUBYMYxVNJ14AnmzYPhBEi6BjwA9mXPnkTqCZB0ErjHlGwe8q/AbWAueeY/SRMg6RJwMWteVzJPwFLirM6kCJA0B1zOmFVK1rfAOeBQj3UCVoFXwFfgx4SapxW50gSc7rHmEXAzIl4PHWYnWQKOFdY/A65GxNZuhNlJ1ofgfGH9csbmYXoFvNiVFBPIEjBbUCv+POqmYHkY+g+bEfEza9g0CkilCXAHcNMEuAO42fMCqn4KS7oBnO1QeqKg7UFJdwrqb0XE+4L6v4i+CwG2X0kv1vQYgKMR8bnv4rFfgY2azcP4BbyrbTB2AW9qG4xdwNvaBk3AECmMNAG1DcYuYK22wZgFfIqIjdomtW+F14CVDnULwOGOPX8BLzvUrXbs50fS84J/fHzLzDbmKzAITYA7gJsmwB3ATRPgDuCmCXAHcNMEuAO4aQLcAdw0Ae4AbpoAdwA3TYA7gJsmwB3ATRPgDuCmCXAHcNMEuAO42fMCfgOg18T619ZVjQAAAABJRU5ErkJggg==";
const _imports_2 =
  "data:image/png;base64,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";
const _imports_3 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABXxJREFUeJztmn+IVUUUxz/n7a7upm8ttQwSMYtUEsuElizCMiGC/sxICMLAKJQg+iPoj6w/oj8SJBDSIiyKfkhQkFSwGaUpuWhakSVZgpIp6a67T3dXd/32x9zrmzfvhz/23nddeR+47Lsz5805Z3Zm3syZY5wHSS3AzcBNQD56rvE+54Hx0dMCtAJtQHNUh1cW0wS0B6p6gWHvvR8YiD73AUNe2WngJFCIvtcXPT3R+wngL2C/mQ3V8s9qOL4IWAksipwbjfQCm4G1ZtZZSaCsAyRNB94B7kvVtPqzFXjSzPb5hSUdIGk+8DUwaYTK4iF7ChiMyoai8nPqcEMW4OrAljxuCkFx+rQw8pHYCzxsZt/HBeeUSpoG7KLc+SNAJ/A7cDRqpED5vBsGesxMIzSyJpJywASKa0yl9eh6YBZu+l4XNNEHdJjZ3rDhTSplQNJKSWPSdChNJI2R9LSkk4FvW0LBeYFAv6R7M7I7cSTNl3Qi8PEeX2BNUPlihvamgqQVgY9vxRUm6XDw35+Ysb2JI2mcpF7Pz25JTUiaHfTMV1kbmxaSPgt8nZsD7grktmdhXJ3YEbzfmcNtc32u5A7oCt5n5IBrg8ID9bElEw4G75ObKd/4HE9So6SxwLPAPOBHYL2ZnUpSx0UQ+jYRSd96i8JZSc0Vv3qJSPo0WHgOSVomqSlJPRdoS0vkY8xmJHV5BX3nb+aiFE4KFPr8IumhJPVdoE0Fz4YdOdxhI6Y/YX0TqH7kngNskvSDpAUJ663FgPe5NUdpoGKAdKkUnFgAbJX0gaQbU9YPFTqgtUplGrwPLAH2B+UGLAX+kLROUniCS5JMO+CsmW0EZgNP4Y7XPi3AcmC/pFWS2sIGEsCf5m317gAAzOyMma3HxRlfpnztGQ+8BOyTtDzhX4xMR0AJZlYws1XATOBd4GwgMhVYB3RJujUhtb6PbTlchDZmmAwws4Nm9gRwBy4kFzIP+CKhPYq/EDflEmgwMcxsj5k9CDwCnAmqpwO3JK3zsuoASa2SngPexC2IPv3AoaR1JrrtvVTkAp2PA68A0yqInAaeMbPepHWHI6DqRUlaSHoA2AlsoNx5ARuBOWa2ISGVJT4243o3jvyGwy41JHUArwELq4h0Ai+Y2c6EVftR7sEcwc9CwsrKkDRL0ie4wMvCCiK/AkvMbHEKzkOpj/1I+tc7Hf2WpCZJM4IT4BFJQ1VOh39KekxSqtNQ0l5P5+Fmgp1Rmsopv6UB+A94HVhjZoMV6pOmZOOXdgfUOl73AauB1WZWSFhvLcqmwG5vSCQaDgOQtC0Y6oOS3kj5xFfLnh7Pll1I2u4bl4LCKZLek/SzpLclzUhax0XaM+j5uw1JXwb/oXFZGpgmkvKBr5tywLFA7oq7FvMIfTueozxUPNLkiMuZsAO6c8DhoHBOnYzJgrnB+z853M7Lp6NOxmRBGH3ejaTJKo3d/5SJaXVA0j7PzyFJ7XHFjmB1vC1jWxNH0t2Bj9/5lWH2xDdKeU9eTyTlJG0JfFzmC0xSafaE5O70RmuC5DnkokwfB74dk5QPBZ9XOUclvSppsaQbRsuokLsEnRmN7L8r+LUilvXzBA34EHi0RtsDuDzc3ujpxh1qzlBMeuyO/vbgIjoDFA9FYbJkLNtG6UHMzy2OEyTj/EBwuYFxvvEEirnKeVzSZTul0W6fj4ClFfMZJTXJZYxVu9Ed7azVhVyySOqQ9LmunI7YJhd7LKPmnJY0BbgfuB2XSzQ1GnLt0XO5HJyGcVOyh2IK/QFgD9BpZlX3NiNa1ORuavK4jhgDXAWMpTin/QRnw83PmHCe+msFuHUlDpScxAVvY5m4rgAUMky5adCgQYMGDRo0aNCgQYMGDUYj/wO3Y/sY9T8R8QAAAABJRU5ErkJggg==";
const _imports_4 =
  "data:image/png;base64,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";
const _sfc_main$1 = {
  name: "Contact",
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Form Data:", this.formData);
      alert("شكراً لتواصلك معنا! سنرد عليك قريباً 💚");
      this.formData = {
        name: "",
        phone: "",
        email: "",
        message: "",
      };
    },
  },
};
const _hoisted_1$1 = { class: "contact-page" };
const _hoisted_2$1 = { class: "contact-section" };
const _hoisted_3$1 = { class: "page-container" };
const _hoisted_4$1 = { class: "contact-grid" };
const _hoisted_5$1 = { class: "contact-form-section" };
const _hoisted_6$1 = { class: "form-group" };
const _hoisted_7$1 = { class: "form-group" };
const _hoisted_8$1 = { class: "form-group" };
const _hoisted_9$1 = { class: "form-group" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$1, [
      createBaseVNode("section", _hoisted_2$1, [
        createBaseVNode("div", _hoisted_3$1, [
          _cache[12] ||
            (_cache[12] = createBaseVNode(
              "div",
              { class: "page-header" },
              [
                createBaseVNode("h1", null, "اتصل بنا"),
                createBaseVNode(
                  "p",
                  null,
                  "نحن دائماً في خدمتك، تواصل معنا الآن"
                ),
              ],
              -1
            )),
          createBaseVNode("div", _hoisted_4$1, [
            _cache[11] ||
              (_cache[11] = createStaticVNode(
                '<div class="contact-info" data-v-a0e4c9b5><h2 data-v-a0e4c9b5>معلومات التواصل</h2><div class="info-card" data-v-a0e4c9b5><div class="info-icon" data-v-a0e4c9b5><img src="' +
                  _imports_0 +
                  '" style="height:4vh;" data-v-a0e4c9b5></div><div class="info-content" data-v-a0e4c9b5><h3 data-v-a0e4c9b5>الهاتف</h3><p dir="ltr" data-v-a0e4c9b5>+966 50 123 4567</p><p dir="ltr" data-v-a0e4c9b5>+966 55 987 6543</p></div></div><div class="info-card" data-v-a0e4c9b5><div class="info-icon" data-v-a0e4c9b5>✉️</div><div class="info-content" data-v-a0e4c9b5><h3 data-v-a0e4c9b5>البريد الإلكتروني</h3><p data-v-a0e4c9b5>info@alandalus.com</p><p data-v-a0e4c9b5>orders@alandalus.com</p></div></div><div class="info-card" data-v-a0e4c9b5><div class="info-icon" data-v-a0e4c9b5>📍</div><div class="info-content" data-v-a0e4c9b5><h3 data-v-a0e4c9b5>العنوان</h3><p data-v-a0e4c9b5>شارع الملك فهد، حي السليمانية</p><p data-v-a0e4c9b5>الرياض، المملكة العربية السعودية</p></div></div><div class="info-card" data-v-a0e4c9b5><div class="info-icon" data-v-a0e4c9b5>🕐</div><div class="info-content" data-v-a0e4c9b5><h3 data-v-a0e4c9b5>ساعات العمل</h3><p data-v-a0e4c9b5>السبت - الخميس: 8 صباحاً - 11 مساءً</p><p data-v-a0e4c9b5>الجمعة: 12 ظهراً - 11 مساءً</p></div></div><div class="social-links" data-v-a0e4c9b5><h3 data-v-a0e4c9b5>تابعنا على</h3><div class="social-icons" data-v-a0e4c9b5><a href="#" class="social-icon" data-v-a0e4c9b5><img src="' +
                  _imports_1 +
                  '" alt="" data-v-a0e4c9b5></a><a href="#" class="social-icon" data-v-a0e4c9b5><img src="' +
                  _imports_2 +
                  '" alt="" data-v-a0e4c9b5></a><a href="#" class="social-icon" data-v-a0e4c9b5><img src="' +
                  _imports_3 +
                  '" alt="" data-v-a0e4c9b5></a><a href="#" class="social-icon" data-v-a0e4c9b5><img src="' +
                  _imports_4 +
                  '" alt="" data-v-a0e4c9b5></a></div></div></div>',
                1
              )),
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode(
                "form",
                {
                  onSubmit:
                    _cache[4] ||
                    (_cache[4] = withModifiers(
                      (...args) =>
                        $options.handleSubmit && $options.handleSubmit(...args),
                      ["prevent"]
                    )),
                  class: "contact-form",
                },
                [
                  _cache[9] ||
                    (_cache[9] = createBaseVNode(
                      "h2",
                      null,
                      "أرسل لنا رسالة",
                      -1
                    )),
                  createBaseVNode("div", _hoisted_6$1, [
                    _cache[5] ||
                      (_cache[5] = createBaseVNode("label", null, "الاسم", -1)),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "text",
                          "onUpdate:modelValue":
                            _cache[0] ||
                            (_cache[0] = ($event) =>
                              ($data.formData.name = $event)),
                          required: "",
                          placeholder: "أدخل اسمك الكامل",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.formData.name]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_7$1, [
                    _cache[6] ||
                      (_cache[6] = createBaseVNode(
                        "label",
                        null,
                        "رقم الهاتف",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "tel",
                          "onUpdate:modelValue":
                            _cache[1] ||
                            (_cache[1] = ($event) =>
                              ($data.formData.phone = $event)),
                          required: "",
                          placeholder: "05xxxxxxxx",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.formData.phone]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_8$1, [
                    _cache[7] ||
                      (_cache[7] = createBaseVNode(
                        "label",
                        null,
                        "البريد الإلكتروني",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "email",
                          "onUpdate:modelValue":
                            _cache[2] ||
                            (_cache[2] = ($event) =>
                              ($data.formData.email = $event)),
                          required: "",
                          placeholder: "example@email.com",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.formData.email]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_9$1, [
                    _cache[8] ||
                      (_cache[8] = createBaseVNode(
                        "label",
                        null,
                        "الرسالة",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "textarea",
                        {
                          "onUpdate:modelValue":
                            _cache[3] ||
                            (_cache[3] = ($event) =>
                              ($data.formData.message = $event)),
                          required: "",
                          rows: "6",
                          placeholder: "اكتب رسالتك هنا...",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.formData.message]]
                    ),
                  ]),
                  _cache[10] ||
                    (_cache[10] = createBaseVNode(
                      "button",
                      {
                        type: "submit",
                        class: "submit-button",
                      },
                      " إرسال الرسالة ",
                      -1
                    )),
                ],
                32
              ),
            ]),
          ]),
        ]),
      ]),
    ])
  );
}
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
  ["render", _sfc_render$1],
  ["__scopeId", "data-v-a0e4c9b5"],
]);
const _sfc_main = {
  name: "CustomOrders",
  data() {
    return {
      currentCardIndex: 0,
      cards: [
        {
          icon: "📦",
          title: "كميات كبيرة",
          description: "نوفر طلبات بكميات كبيرة للمناسبات والحفلات",
        },
        {
          icon: "👥",
          title: "مناسبات خاصة",
          description: "أعياد ميلاد، حفلات، مناسبات عائلية",
        },
        {
          icon: "✨",
          title: "تصميم خاص",
          description: "سجل طلبك بالمكونات والطريقة التي تفضلها",
        },
      ],
      customOrderData: {
        name: "",
        phone: "",
        orderType: "",
        quantity: "",
        date: "",
        details: "",
      },
    };
  },
  mounted() {
    setInterval(() => {
      this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
    }, 3000);
  },
  methods: {
    handleCustomOrderSubmit() {
      console.log("Order Data:", this.customOrderData);
      alert("تم استلام طلبك الخاص! سنتواصل معك قريباً 🎉");
      this.customOrderData = {
        name: "",
        phone: "",
        orderType: "",
        quantity: "",
        date: "",
        details: "",
      };
    },
  },
};
const _hoisted_1 = { class: "custom-orders-page" };
const _hoisted_2 = { class: "custom-orders-section" };
const _hoisted_3 = { class: "page-container" };
const _hoisted_4 = { class: "content-grid" };
const _hoisted_5 = { class: "form-section" };
const _hoisted_6 = { class: "form-group" };
const _hoisted_7 = { class: "form-group" };
const _hoisted_8 = { class: "form-group" };
const _hoisted_9 = { class: "form-group" };
const _hoisted_10 = { class: "form-group" };
const _hoisted_11 = { class: "form-group" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1, [
      createBaseVNode("section", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode(
              "div",
              { class: "features-section carousel-container" },
              [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList($data.cards, (card, index) => {
                    return (
                      openBlock(),
                      createBaseVNode(
                        "div",
                        {
                          key: index,
                          class: normalizeClass([
                            "feature-card",
                            { active: index === $data.currentCardIndex },
                          ]),
                          style: {
                            display:
                              index === $data.currentCardIndex
                                ? "block"
                                : "none",
                          },
                        },
                        [
                          createBaseVNode(
                            "div",
                            { class: "feature-icon" },
                            toDisplayString(card.icon),
                            1
                          ),
                          createBaseVNode(
                            "h3",
                            null,
                            toDisplayString(card.title),
                            1
                          ),
                          createBaseVNode(
                            "p",
                            null,
                            toDisplayString(card.description),
                            1
                          ),
                        ],
                        6
                      )
                    );
                  }),
                  128
                )),
              ]
            ),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode(
                "form",
                {
                  onSubmit:
                    _cache[6] ||
                    (_cache[6] = withModifiers(
                      (...args) =>
                        $options.handleCustomOrderSubmit &&
                        $options.handleCustomOrderSubmit(...args),
                      ["prevent"]
                    )),
                  class: "order-form",
                },
                [
                  _cache[14] ||
                    (_cache[14] = createBaseVNode(
                      "h2",
                      null,
                      "أرسل طلبك الخاص",
                      -1
                    )),
                  createBaseVNode("div", _hoisted_6, [
                    _cache[7] ||
                      (_cache[7] = createBaseVNode("label", null, "الاسم", -1)),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "text",
                          required: "",
                          "onUpdate:modelValue":
                            _cache[0] ||
                            (_cache[0] = ($event) =>
                              ($data.customOrderData.name = $event)),
                          placeholder: "أدخل اسمك",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.customOrderData.name]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_7, [
                    _cache[8] ||
                      (_cache[8] = createBaseVNode(
                        "label",
                        null,
                        "رقم الهاتف",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "tel",
                          required: "",
                          "onUpdate:modelValue":
                            _cache[1] ||
                            (_cache[1] = ($event) =>
                              ($data.customOrderData.phone = $event)),
                          placeholder: "05xxxxxxxx",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.customOrderData.phone]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    _cache[10] ||
                      (_cache[10] = createBaseVNode(
                        "label",
                        null,
                        "نوع الطلب",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "select",
                        {
                          required: "",
                          "onUpdate:modelValue":
                            _cache[2] ||
                            (_cache[2] = ($event) =>
                              ($data.customOrderData.orderType = $event)),
                        },
                        [
                          ...(_cache[9] ||
                            (_cache[9] = [
                              createStaticVNode(
                                '<option value="" data-v-137b4a80>اختر نوع الطلب</option><option value="meals" data-v-137b4a80>وجبات رئيسية</option><option value="desserts" data-v-137b4a80>حلويات</option><option value="cakes" data-v-137b4a80>كيك وتورتات</option><option value="mixed" data-v-137b4a80>مختلط</option>',
                                5
                              ),
                            ])),
                        ],
                        512
                      ),
                      [[vModelSelect, $data.customOrderData.orderType]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_9, [
                    _cache[11] ||
                      (_cache[11] = createBaseVNode(
                        "label",
                        null,
                        "الكمية المطلوبة",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "text",
                          required: "",
                          "onUpdate:modelValue":
                            _cache[3] ||
                            (_cache[3] = ($event) =>
                              ($data.customOrderData.quantity = $event)),
                          placeholder: "مثال: 50 شخص",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.customOrderData.quantity]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_10, [
                    _cache[12] ||
                      (_cache[12] = createBaseVNode(
                        "label",
                        null,
                        "تاريخ التسليم",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "input",
                        {
                          type: "date",
                          required: "",
                          "onUpdate:modelValue":
                            _cache[4] ||
                            (_cache[4] = ($event) =>
                              ($data.customOrderData.date = $event)),
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.customOrderData.date]]
                    ),
                  ]),
                  createBaseVNode("div", _hoisted_11, [
                    _cache[13] ||
                      (_cache[13] = createBaseVNode(
                        "label",
                        null,
                        "تفاصيل الطلب",
                        -1
                      )),
                    withDirectives(
                      createBaseVNode(
                        "textarea",
                        {
                          required: "",
                          "onUpdate:modelValue":
                            _cache[5] ||
                            (_cache[5] = ($event) =>
                              ($data.customOrderData.details = $event)),
                          rows: "5",
                          placeholder:
                            "اكتب تفاصيل طلبك: المكونات، طريقة التحضير، أي ملاحظات خاصة...",
                        },
                        null,
                        512
                      ),
                      [[vModelText, $data.customOrderData.details]]
                    ),
                  ]),
                  _cache[15] ||
                    (_cache[15] = createBaseVNode(
                      "button",
                      {
                        type: "submit",
                        class: "submit-button",
                      },
                      " إرسال الطلب 📨 ",
                      -1
                    )),
                ],
                32
              ),
            ]),
          ]),
        ]),
      ]),
    ])
  );
}
const SpecialOreders = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["render", _sfc_render],
  ["__scopeId", "data-v-137b4a80"],
]);
const routes = [
  { path: "/HomeView", name: "HomeView", component: Home },
  { path: "/", name: "Home", component: Home },
  { path: "/NavBar", name: "NavBar", component: NavBar },
  {
    path: "/Location",
    name: "LocationModal",
    component: LocationModal,
    meta: { title: " سجل - مذاق الأندلس للحلويات " },
  },
  {
    path: "/food-restaurant",
    name: "FoodRestaurant",
    component: FoodRestaurant,
    meta: { title: " مذاق النبلاء للمأكولات - مذاق الأندلس للحلويات " },
  },
  {
    path: "/sweets-restaurant",
    name: "SweetsRestaurant",
    component: SweetsRestaurant,
    meta: { title: "  مذاق الأندلس للحلويات " },
  },
  {
    path: "/Sweets-restaurant",
    name: "SweetsRestaurantCapital",
    component: SweetsRestaurant,
    meta: { title: "  مذاق الأندلس للحلويات " },
  },
  {
    path: "/Orders",
    name: "Orders",
    component: Orders,
    meta: { title: " السلة - مذاق الأندلس للحلويات " },
  },
  { path: "/Profile", name: "Profile", component: _sfc_main$4 },
  { path: "/Login", name: "Login", component: Login },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { title: " فاتورتك - مذاق الأندلس للحلويات " },
  },
  { path: "/Footer", name: "Footer", component: Footer },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { title: "  اتصل بنا- مذاق الأندلس للحلويات " },
  },
  {
    path: "/special-orders",
    name: "SpecialOreders",
    component: SpecialOreders,
    meta: { title: " عروض المناسبات والحفلات - مذاق الأندلس للحلويات " },
  },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log("NAVIGATE to:", to.name, to.path);
  const userLocation = localStorage.getItem("userLocation");
  if (!userLocation) {
    const publicPages = [
      "Home",
      "HomeView",
      "LocationModal",
      "Contact",
      "SpecialOreders",
      "FoodRestaurant",
      "SweetsRestaurant",
    ];
    if (!publicPages.includes(to.name)) {
      next({ name: "Home" });
      return;
    }
  }
  next();
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "مذاق الأندلس للحلويات";
  next();
});
const app = createApp(_sfc_main$9);
app.use(router);
app.mount("#app");
