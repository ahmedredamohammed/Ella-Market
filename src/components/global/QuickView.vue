<template>
  <div class="quick-view">
    <v-dialog v-model="dialog" max-width="900" max-height="500">
      <v-icon
        style="
          position: absolute;
          top: -15px;
          right: -15px;
          background-color: black;
          color: white;
          padding: 15px;
          border-radius: 50%;
          z-index: 10;
        "
        @click="dialog = false"
        >mdi-close</v-icon
      >
      <v-card elevation="0" class="dialog-card">
        <v-container fluid class="bg-white pa-10">
          <v-row>
            <v-col cols="12" md="7">
              <v-skeleton-loader
                v-if="loading"
                type="image, image, image"
              ></v-skeleton-loader>
              <img
                :src="tab ? tab : product.thumbnail"
                alt="Product Image"
                class="w-100"
                height="400"
                v-if="!loading"
              />
              <v-tabs
                center-active
                height="120"
                v-model="tab"
                class="mt-10"
                v-if="!loading"
              >
                <v-tab
                  v-for="(img, i) in product.images"
                  :key="i"
                  class="mx-10"
                  :value="img"
                >
                  <img :src="img" alt="" width="100" />
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" md="5" class="pt-0 pl-6 mt-5 mt-md-0">
              <v-skeleton-loader
                v-if="loading"
                type="article, article, article"
              ></v-skeleton-loader>
              <v-card elevation="0" v-if="!loading">
                <v-card-title
                  class="px-0"
                  style="
                    font-size: 19px;
                    font-weight: bold;
                    white-space: pre-wrap;
                  "
                  >({{ product.title }}) Sample - {{ product.category }} For
                  Salp</v-card-title
                >
                <div
                  class="rating d-flex align-center justify-start"
                  style="gap: 10px"
                >
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    readonly
                    color="yellow-darken-2"
                    size="x-small"
                    density="copact"
                  ></v-rating>
                  <span
                    class="mt-1"
                    style="font-size: 13px; color: #777; font-weight: 400"
                  >
                    Stock: {{ product.stock }}
                  </span>
                </div>
                <v-card-text
                  class="px-0"
                  style="font-size: 13px; color: #777; font-weight: 600"
                  >{{ product.description }}</v-card-text
                >
                <v-card-text
                  class="px-0 pt-0"
                  style="font-size: 13px; color: #777; font-weight: 600"
                  >Brand: {{ product.brand }}</v-card-text
                >
                <v-card-text
                  class="px-0 pt-0"
                  style="font-size: 13px; color: #777; font-weight: 600"
                  >Availability:
                  {{
                    product.stock > 0 ? "In Stock" : "Out Of Stok"
                  }}</v-card-text
                >
                <v-card-text
                  class="pl-0 pt-1 text-grey-lighten-1 text-subtitle-1"
                >
                  <del>{{ `$${product.price}` }}</del> From
                  <span class="text-black font-weight-black pt-1">
                    {{
                      `${Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )}`
                    }}
                  </span>
                </v-card-text>
                <v-card-text
                  class="px-0 pt-0"
                  style="font-size: 13px; color: #777; font-weight: 600"
                >
                  Quantity
                </v-card-text>
                <div
                  class="counter px-2 py-2"
                  style="
                    border-radius: 30px;
                    width: fit-content;
                    border: 1px solid #e1e5e9;
                  "
                >
                  <v-icon size="22" @click="quantity > 1 ? quantity-- : false"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    style="
                      padding: 5px 0;
                      text-align: center;
                      font-size: 13px;
                      color: #777;
                      border: none;
                      outline: none;
                      width: 60px;
                    "
                    min="1"
                    :value="quantity"
                  />
                  <v-icon size="22" @click="quantity++">mdi-plus</v-icon>
                </div>
                <v-card-text
                  class="px-0"
                  style="font-size: 13px; color: #777; font-weight: 600"
                >
                  Subtotal: ${{
                    Math.ceil(
                      product.price -
                        product.price * (product.discountPercentage / 100)
                    ) * quantity
                  }}
                </v-card-text>
                <v-card-actions class="mt-2 w-100 px-0">
                  <v-btn
                    variant="outlined"
                    style="
                      border-radius: 30px;
                      background-color: black;
                      text-transform: none;
                    "
                    class="text-white w-75"
                    density="compact"
                    height="50"
                    @click="addItemTCart(product)"
                    :loading="btnLoading"
                    >Add To Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import emitter from "@/EmitterBus";
import { cartStore } from "@/stores/Cart";
import { mapActions } from "pinia";

export default {
  data: () => ({
    loading: false,
    quantity: 1,
    tab: "",
    dialog: false,
    product: "",
    btnLoading: false,
  }),
  methods: {
    ...mapActions(cartStore, ["addItem"]),
    addItemTCart(product) {
      product.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItem(product);
        emitter.emit("openCard");
        emitter.emit("showMsg", product.title);
        this.dialog = false;
      }, 1000);
    },
  },
  beforeMount() {
    emitter.on("openQuickView", (data) => {
      this.loading = true;
      this.quantity = 1;
      this.product = data;
      this.dialog = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  },
  components: {
    VSkeletonLoader,
  },
};
</script>
<style scoped lang="scss">
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.dialog-card {
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
</style>
