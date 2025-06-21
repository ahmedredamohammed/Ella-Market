import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/products",
    name: "product-category",
    component: () => import("@/views/AllProducts.vue"),
  },
  {
    path: "/products/product-details/:productId",
    name: "product-details",
    component: () => import("@/views/ProductDetails.vue"),
  },
  {
    path: "/cart-page",
    name: "cart-page",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/check-out",
    name: "check-out",
    component: () => import("@/views/CheckoutPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
