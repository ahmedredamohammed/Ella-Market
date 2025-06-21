import { defineStore } from "pinia";
import axios from "axios";

export const productsModule = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    mobiles: [],
    fragrances: [],
    furniture: [],
    groceries: [],
    categoryData: [],
    singleProduct: "",
    categories: [
      {
        title: "Smart Phones",
        router: "smartphones",
      },
      {
        title: "Laptops",
        router: "laptops",
      },
      {
        title: "Furniture",
        router: "furniture",
      },
      {
        title: "Fragrances",
        router: "fragrances",
      },
      {
        title: "Men's Watches",
        router: "mens-watches",
      },
      {
        title: "Women's Bags",
        router: "womens-bags",
      },
      {
        title: "Groceries",
        router: "groceries",
      },
    ],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.flashDeals = res.data.products.slice(0, 10);
          this.fragrances = res.data.products.filter(
            (el) => el.category === "fragrances"
          );
          this.furniture = res.data.products.filter(
            (el) => el.category === "furniture"
          );
          this.groceries = res.data.products.filter(
            (el) => el.category === "groceries"
          );
        })
        .catch((err) => console.log(err));
    },
    async getPhones() {
      await axios
        .get("https://dummyjson.com/products/category/smartphones")
        .then((res) => {
          this.mobiles = res.data.products.slice(8, 15);
        })
        .catch((err) => console.log(err));
    },
    async getNew() {
      await axios
        .get("https://dummyjson.com/products/category/laptops")
        .then((res) => {
          this.newProducts = res.data.products.slice(0.5);
        })
        .catch((err) => console.log(err));
    },
    async getCategoryData(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => {
          this.categoryData = res.data.products;
        })
        .catch((err) => console.log(err));
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => {
          this.singleProduct = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
