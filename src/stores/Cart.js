import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    catrItems: [],
  }),
  actions: {
    addItem(item) {
      let exist = false;
      for (let i = 0; i < this.catrItems.length; i++) {
        if (this.catrItems[i].id == item.id) {
          this.catrItems[i].quantity += item.quantity;
          exist = true;
          break;
        }
      }
      if (!exist) {
        this.catrItems.push(JSON.parse(JSON.stringify(item)));
        // JSON.parse(JSON.stringify(item)): to avoid the incorrect functionality by get of the reference of product object
      }
      localStorage.setItem("cart-items", JSON.stringify(this.catrItems));
    },
    getCartItems() {
      if (localStorage.getItem("cart-items")) {
        this.catrItems = JSON.parse(localStorage.getItem("cart-items"));
      }
      return this.catrItems;
    },
    deleteItem(id) {
      for (let i = 0; i < this.catrItems.length; i++) {
        if (this.catrItems[i].id == id) {
          this.catrItems.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cart-items", JSON.stringify(this.catrItems));
    },
    setToLocalstorage() {
      localStorage.setItem("cart-items", JSON.stringify(this.catrItems));
    },
    resetData() {
      this.catrItems = [];
      localStorage.removeItem("cart-items");
    },
  },
});
