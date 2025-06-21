<template>
  <div class="cart-page overflow-hidden">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pb-0 px-0">
          <v-breadcrumbs :items="['Home', 'Your Cart']" style="font-size: 13px">
            <template v-slot:divider>
              <v-icon color="#878484">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title
            class="pl-0 pr-2 py-0 d-flex justify-space-between align-center w-100"
            style="font-size: 35px; font-weight: bold"
            >Your Cart</v-card-title
          >
        </v-col>
        <v-col cols="12" v-if="!catrItems.length">
          <v-card-text class="pa-0" style="color: #6f6f6f"
            >Free Shipping For All Orders Over $10,000.00</v-card-text
          >
          <div class="info my-5 d-flex flex-column align-center justify-center">
            <v-card-text style="color: #777">Your Cart Is Empty !</v-card-text>
            <v-card-actions>
              <v-btn
                variant="outlined"
                density="compact"
                height="45"
                style="
                  font-weight: 100;
                  color: #777;
                  padding: 10px 80px;
                  border-radius: 30px;
                  text-transform: none;
                  border-color: rgb(199, 199, 199);
                "
                @click="$router.push({ name: 'home' })"
                >Continue Shopping</v-btn
              >
            </v-card-actions>
          </div>
        </v-col>
        <v-col cols="12" class="pt-0" v-if="catrItems.length">
          <div
            class="progress-bar mt-2 mr-2 position-relative"
            v-if="catrItems.length"
          >
            <span
              v-html="cartTruck"
              :style="`
            position: absolute;
            bottom: 85%;
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
                  ? 'red'
                  : parseInt((calcTotalPrice / 10000) * 100) < 75
                  ? 'orange'
                  : 'green'
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
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="px-1 pt-0 the-pro" fluid v-if="catrItems.length">
      <v-row class="mb-4">
        <v-col cols="12" lg="8" class="px-4 mt-8 mt-lg-0">
          <div class="scroller">
            <v-table class="w-100 the-table">
              <thead>
                <tr>
                  <th style="font-size: 13px; font-weight: bold">PRODUCT</th>
                  <th
                    class="text-center"
                    style="font-size: 13px; font-weight: bold"
                  >
                    PRICE
                  </th>
                  <th
                    class="text-center"
                    style="font-size: 13px; font-weight: bold"
                  >
                    QUANTITY
                  </th>
                  <th
                    class="text-center"
                    style="font-size: 13px; font-weight: bold"
                  >
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in catrItems" :key="item.id">
                  <td width="55%">
                    <v-row class="align-center mb-4 py-2">
                      <v-col cols="5">
                        <img :src="item.thumbnail" class="w-100" alt="" />
                      </v-col>
                      <v-col cols="7">
                        <v-card elevation="0" class="pa-0">
                          <v-card-title
                            class="px-0"
                            style="
                              font-size: 14px;
                              line-height: 1.2;
                              white-space: pre-wrap;
                            "
                            >{{ item.title }} Sample -
                            {{ item.category }}</v-card-title
                          >
                          <v-card-text class="px-0 pb-1" style="color: #6f6f6f"
                            >Category: {{ item.category }}</v-card-text
                          >
                        </v-card>
                      </v-col>
                    </v-row>
                  </td>
                  <td class="text-center" width="15%">
                    ${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      )
                    }}
                  </td>
                  <td class="text-center" width="15%">
                    <div
                      class="counter ml-3 px-2 py-2"
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
                      <v-icon size="19" @click="item.quantity++"
                        >mdi-plus</v-icon
                      >
                    </div>
                  </td>
                  <td
                    class="text-center"
                    width="15%"
                    style="font-size: 14px; font-weight: bold; color: #f44336"
                  >
                    ${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      ) * item.quantity
                    }}
                  </td>
                  <td width="15%">
                    <v-icon
                      style="font-size: 22px; color: #6f6f6f; cursor: pointer"
                      @click="deleteItem(item.id)"
                      >mdi-close</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <v-divider length="75%" color="#02218f" class="mx-auto"></v-divider>
          <v-divider length="75%" color="#02218f" class="mx-auto"></v-divider>
          <v-divider length="75%" color="#02218f" class="mx-auto"></v-divider>
          <v-divider length="75%" color="#02218f" class="mx-auto"></v-divider>
          <v-card-text
            class="px-0 mt-5 d-flex align-center"
            style="color: #6f6f6f; gap: 10px"
            v-if="catrItems.length"
          >
            <span v-html="securePayment"></span>
            <span>Secure Shopping Guarantee</span></v-card-text
          >
          <img src="@/assets/images/cart-page-cards.webp" width="270" alt="" />
        </v-col>
        <v-col
          cols="12"
          lg="4"
          class="px-4 mt-8 mt-lg-0"
          v-if="catrItems.length"
        >
          <v-card elevation="0">
            <v-card-text style="font-size: 14px; font-weight: bold">
              ORDER SUMMARY
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="d-flex align-center justify-space-between">
              <span>Subtotal</span>
              <span style="font-size: 16px">${{ calcTotalPrice }}</span>
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text>Get shipping estimate</v-card-text>
            <select
              name="country"
              id=""
              class="w-100 pa-3"
              style="
                color: #777;
                border: 1px solid #77777775;
                border-radius: 30px;
                font-size: 14px;
              "
            >
              <option
                :value="country"
                v-for="country in countries"
                :key="country"
              >
                {{ country }}
              </option>
            </select>
            <div class="states mt-4">
              <select
                name="country"
                id=""
                class="pa-3"
                style="
                  color: #777;
                  border: 1px solid #77777775;
                  border-radius: 30px;
                  font-size: 14px;
                  margin-right: 1%;
                  width: 55%;
                "
              >
                <option
                  :value="country"
                  v-for="country in countries"
                  :key="country"
                >
                  {{ country }}
                </option>
              </select>
              <input
                type="text"
                class="pa-3"
                style="
                  color: #777;
                  border: 1px solid #77777775;
                  border-radius: 30px;
                  font-size: 14px;
                  width: 43%;
                  margin-left: 1%;
                "
              />
              <v-card-actions class="px-0 my-5">
                <v-btn
                  style="
                    text-transform: none;
                    border-radius: 30px;
                    border-color: rgb(199, 199, 199);
                  "
                  class="w-100"
                  color="#3673e2"
                  variant="elevated"
                  elevation="0"
                  density="compact"
                  height="45"
                  >Calculate Shipping</v-btn
                >
              </v-card-actions>
            </div>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="d-flex align-center justify-space-between">
              <span>TOTAL</span>
              <span style="font-size: 16px">${{ calcTotalPrice }}</span>
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-actions class="px-0 my-5 flex-column" style="gap: 15px">
              <v-btn
                style="
                  text-transform: none;
                  border-color: rgb(199, 199, 199);
                  background-color: #3673e2;
                "
                class="w-100 px-0 text-white"
                variant="outlined"
                elevation="0"
                density="compact"
                height="45"
                @click="toCheckout"
                >Proceed To Checkout</v-btn
              >
              <v-btn
                style="text-transform: none; border-color: rgb(199, 199, 199)"
                class="w-100 text-black px-0"
                variant="outlined"
                elevation="0"
                density="compact"
                height="45"
                color="#005aa1"
                @click="$router.push({ name: 'home' })"
                >Continue Shopping</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { cartStore } from "@/stores/Cart";
import { ref, onMounted, computed } from "vue";
import { svgs } from "@/stores/SVGs";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const theCartStore = cartStore();
const { catrItems } = storeToRefs(theCartStore);
const { getCartItems, deleteItem, setToLocalstorage } = theCartStore;

const theSvgs = svgs();
const { cartTruck, securePayment } = theSvgs;

const calcTotalPrice = computed(() => {
  let total = 0;
  catrItems.value.forEach((item) => {
    total +=
      Math.ceil(item.price - item.price * (item.discountPercentage / 100)) *
      item.quantity;
  });
  return total;
});

const countries = ref(["Palestine", "Egypt", "Seria", "Soudan"]);

const toCheckout = () => {
  setToLocalstorage();
  router.push({ name: "check-out" });
};
onMounted(() => {
  getCartItems();
});
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
  .scroller {
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(192, 192, 192, 0.42);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(159, 159, 159, 0.534);
    }
  }
}
// Media Query
@media (max-width: 922px) {
  .cart-page {
    .the-pro {
      .v-divider {
        display: none !important;
      }
      .scroller {
        overflow-x: auto !important;
        .the-table {
          min-width: 900px !important;
        }
      }
    }
  }
}
</style>
