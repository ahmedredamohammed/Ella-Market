<template>
  <div class="drawer">
    <!--temporary "عشان متقللش الحجم بتاع الاسكرين فتظهر فوق العناصر -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      :width="windowWidth <= 767 ? windowWidth / 2 : 370"
      class="pr-1"
    >
      <v-card elevation="0" class="px-0">
        <v-card-title
          class="pl-0 pr-2 d-flex align-center justify-space-between"
          style="font-size: 17px; font-weight: bold"
          >Shopping Cart
          <v-icon size="20" @click="drawer = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text class="px-0" style="color: #6f6f6f"
          >{{ catrItems.length }} Items</v-card-text
        >
        <v-card-text
          class="px-0"
          style="color: #6f6f6f"
          v-if="!catrItems.length"
          >Free shipping for all orders over $10,000.00</v-card-text
        >
        <v-card-text
          class="px-0 text-center"
          style="color: #6f6f6f"
          v-if="!catrItems.length"
          >Your cart is empty</v-card-text
        >
        <v-card-actions v-if="!catrItems.length">
          <v-btn
            variant="outlined"
            density="compact"
            class="w-100"
            height="45"
            style="
              border-radius: 30px;
              font-weight: bold;
              text-transform: none;
              border-color: rgb(199, 199, 199);
            "
            @click="drawer = false"
            >Continue Shopping</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card elevation="0" class="pa-0" v-if="catrItems.length">
        <div class="progress-bar mt-5 mr-2 position-relative">
          <span
            v-html="cartTruck"
            :style="`
            position: absolute;
            bottom: 0%;
            z-index: 100;
            transition: 0.15s;
            fill: ${
              parseInt((calcTotalPrice / 10000) * 100) < 50
                ? '#f44336'
                : parseInt((calcTotalPrice / 10000) * 100) < 75
                ? '#ff9800'
                : '#4caf50'
            };
            left: calc(${
              parseInt((calcTotalPrice / 10000) * 100) <= 100
                ? parseInt((calcTotalPrice / 10000) * 100)
                : 100
            }% - 30px);
          `"
          ></span>
          <v-progress-linear
            :color="
              parseInt((calcTotalPrice / 10000) * 100) < 50
                ? '#f44336'
                : parseInt((calcTotalPrice / 10000) * 100) < 75
                ? '#ff9800'
                : '#4caf50'
            "
            height="8"
            :model-value="
              parseInt((calcTotalPrice / 10000) * 100) <= 100
                ? parseInt((calcTotalPrice / 10000) * 100)
                : 100
            "
            striped
          ></v-progress-linear>
          <!--striped: for animation -->
        </div>
        <v-card-text
          class="px-0 pt-2"
          style="color: #6f6f6f"
          v-if="10000 - calcTotalPrice >= 0"
          >Only ${{
            10000 - calcTotalPrice >= 0 ? 10000 - calcTotalPrice : false
          }}
          away from free shipping</v-card-text
        >
        <v-card-text class="px-0 pt-2" style="color: #6f6f6f" v-else
          >Now your order is included free shipping</v-card-text
        >
        <v-container
          class="px-1 the-pro"
          style="height: 270px; overflow-x: hidden; overflow-y: auto"
        >
          <v-row
            v-for="item in catrItems"
            :key="item.id"
            class="align-center mb-4"
          >
            <v-col cols="12" sm="5">
              <img :src="item.thumbnail" class="w-100" alt="" />
            </v-col>
            <v-col cols="12" sm="7">
              <v-card elevation="0" class="pa-0">
                <v-card-title
                  class="px-0"
                  style="
                    font-size: 14px;
                    line-height: 1.2;
                    white-space: pre-wrap;
                  "
                  >{{ item.title }} Sample - {{ item.category }}</v-card-title
                >
                <v-card-text class="px-0 pb-1" style="color: #6f6f6f"
                  >Category: {{ item.category }}</v-card-text
                >
                <v-card-text
                  class="px-0 pt-0"
                  style="font-size: 14px; font-weight: bold; color: #f44336"
                  >${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    ) * item.quantity
                  }}</v-card-text
                >
                <div
                  class="item-footer d-flex align-center justify-space-between"
                >
                  <div
                    class="counter px-2 py-2"
                    style="
                      border-radius: 30px;
                      width: fit-content;
                      border: 1px solid #e1e5e9;
                    "
                  >
                    <v-icon
                      size="19"
                      @click="item.quantity > 1 ? item.quantity-- : false"
                      >mdi-minus</v-icon
                    >
                    <input
                      type="number"
                      style="
                        padding: 2px 0;
                        text-align: center;
                        font-size: 13px;
                        color: #777;
                        border: none;
                        outline: none;
                        width: 30px;
                      "
                      min="1"
                      v-model="item.quantity"
                    />
                    <v-icon size="19" @click="item.quantity++">mdi-plus</v-icon>
                  </div>
                  <v-icon
                    style="font-size: 18px; color: #6f6f6f; cursor: pointer"
                    @click="deleteItem(item.id)"
                    >mdi-close</v-icon
                  >
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="mt-5 flex-column" v-if="catrItems.length">
          <v-btn
            style="
              text-transform: none;
              border-radius: 30px;
              border-color: rgb(199, 199, 199);
            "
            class="w-100 mb-2"
            color="blue"
            variant="elevated"
            elevation="0"
            density="compact"
            height="45"
            @click="toCheckout"
            >Check Out</v-btn
          >
          <v-btn
            style="
              text-transform: none;
              border-radius: 30px;
              border-color: rgb(199, 199, 199);
            "
            class="w-100"
            variant="outlined"
            density="compact"
            height="45"
            @click="$router.push({ name: 'cart-page' })"
            >View Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { cartStore } from "@/stores/Cart";
import { svgs } from "@/stores/SVGs";
import emitter from "@/EmitterBus";
import { mapActions, mapState } from "pinia";

export default {
  data: () => ({
    drawer: false,
    quantity: 1,
  }),
  props: {
    windowWidth: {
      type: Number,
    },
  },
  computed: {
    ...mapState(svgs, ["cartTruck"]),
    ...mapState(cartStore, ["catrItems"]),
    calcTotalPrice() {
      let total = 0;
      this.catrItems.forEach((item) => {
        total +=
          Math.ceil(item.price - item.price * (item.discountPercentage / 100)) *
          item.quantity;
      });
      return total;
    },
  },
  methods: {
    ...mapActions(cartStore, [
      "getCartItems",
      "deleteItem",
      "setToLocalstorage",
    ]),
    toCheckout() {
      this.setToLocalstorage();
      this.$router.push({ name: "check-out" });
    },
    openCard() {
      this.drawer = true;
    },
  },
  mounted() {
    emitter.on("openCard", this.openCard);
    this.getCartItems();
  },
  unmounted() {
    emitter.off("openCard", this.openCard);
  },
};
</script>
<style scoped lang="scss">
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.the-pro {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(192, 192, 192, 0.53);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(159, 159, 159, 0.534);
  }
}
.drawer {
  button {
    height: 30px !important;
    font-size: 12px;
  }
}
</style>
