<template>
  <div class="all-products mt-10">
    <h1 class="text-center">{{ $route.query.title }}</h1>
    <v-container>
      <v-row v-if="loading">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pt-10 px-5"
          v-for="n in 4"
          :key="n"
        >
          <v-skeleton-loader type="image, article, button"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-card elevation="0" class="pt-10" min-height="700px" v-if="!loading">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="px-10 px-sm-5 mt-5 mt-lg-0"
            v-for="product in categoryData"
            :key="product.id"
          >
            <v-lazy>
              <v-card elevation="0" class="pb-5 px-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    class="the-image position-relative"
                    style="
                      height: 200px;
                      overflow: hidden;
                      border-top-left-radius: 5px;
                      border-top-right-radius: 5px;
                    "
                  >
                    <img
                      :src="
                        showenPic[product.title]
                          ? showenPic[product.title]
                          : product.thumbnail
                      "
                      class="w-100"
                      :style="`height: 100%; cursor: pointer; transition: 0.5s all ease-in-out; transform: scale(${
                        isHovering ? 1.05 : 1
                      })`"
                      alt="The Product Image"
                      v-bind="props"
                    />
                    <v-btn
                      density="compact"
                      variant="outlined"
                      width="90"
                      height="30"
                      class="bg-white quick-btn"
                      style="
                        border-radius: 30px;
                        font-size: 12px;
                        text-transform: none;
                        transition: 0.5s;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        opacity: 0;
                      "
                      @click="openQuickView(product)"
                      >Quick View</v-btn
                    >
                  </div>
                </v-hover>
                <v-card-text class="pl-0 py-1 text-subtitle-1">
                  {{
                    `(${product.title}) ${product.description}`.length <= 80
                      ? `(${product.title}) ${product.description}`
                      : `(${product.title}) ${product.description}`.substring(
                          0,
                          65
                        ) + "..."
                  }}
                </v-card-text>
                <v-rating
                  v-model="product.rating"
                  half-increments
                  readonly
                  color="yellow-darken-2"
                  size="x-small"
                  density="copact"
                ></v-rating>
                <v-card-text
                  class="pl-0 pt-1 text-grey-lighten-1 text-subtitle-1"
                >
                  <del>{{ `$${product.price}` }}</del> From
                  <span class="text-red font-weight-black pt-1">
                    {{
                      `$${Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )}`
                    }}
                  </span>
                </v-card-text>
                <v-btn-toggle v-model="showenPic[product.title]">
                  <v-btn
                    style="width: fit-content"
                    size="x-small"
                    rounded="xl"
                    :ripple="false"
                    v-for="(pic, i) in product.images"
                    :key="i"
                    :value="pic"
                  >
                    <img
                      style="
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        padding: 3px;
                        border: 1px solid #e1e5e9;
                      "
                      :src="pic"
                      alt=""
                    />
                  </v-btn>
                </v-btn-toggle>
                <div class="d-flex align-center justify-center mt-5">
                  <v-btn
                    density="compact"
                    width="230"
                    height="35"
                    style="text-transform: none; border-radius: 20px"
                    variant="outlined"
                    @click="
                      $router.push({
                        name: 'product-details',
                        params: { productId: product.id },
                      })
                    "
                    >Choose OPtions</v-btn
                  >
                </div>
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { productsModule } from "@/stores/Products";
import { mapActions, mapState } from "pinia";
import emitter from "@/EmitterBus";

export default {
  data: () => ({
    showenPic: {},
    loading: false,
  }),
  computed: {
    ...mapState(productsModule, ["categoryData"]),
  },
  methods: {
    ...mapActions(productsModule, ["getCategoryData"]),
    openQuickView(product) {
      emitter.emit("openQuickView", product);
    },
  },
  watch: {
    async $route() {
      if (this.$route.name == "product-category") {
        this.loading = true;
        await this.getCategoryData(this.$route.query.category);
        this.loading = false;
      }
    },
  },
  async mounted() {
    if (!this.$route.query.category) {
      return this.$router.go(-1);
    }
    this.loading = true;
    await this.getCategoryData(this.$route.query.category);
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
.all-products {
  .the-image:hover {
    .quick-btn {
      opacity: 1 !important;
    }
  }
}
</style>
