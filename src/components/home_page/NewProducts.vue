<template>
  <div class="top-products py-12">
    <div class="title d-flex align-center justify-center px-5 mb-3">
      <h2
        class="text-start text-black flex-grow-1"
        style="font-size: 30px; font-weight: 900"
      >
        New Products
      </h2>
      <router-link
        class="text-black"
        style="font-size: 14px"
        :to="{
          name: 'product-category',
          query: {
            title: categories[index].title,
            category: categories[index].router,
          },
        }"
        >Show All</router-link
      >
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7" class="skele" v-if="!newProducts.length">
          <v-row class="pb-9 pt-16 d-flex justify-center" style="gap: 25px">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" class="pt-14 order-1 order-md-0" v-else>
          <swiper
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="3"
            :space-between="25"
            class="pb-9 px-5"
            :breakpoints="breakPoints"
          >
            <swiper-slide v-for="product in newProducts" :key="product.id">
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
                      width="60"
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
                <v-btn-toggle v-model="showenPic[product.title]" mandatory>
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
                    class="px-5 py-2"
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
            </swiper-slide>
            <div class="swiper-prev"></div>
            <div class="swiper-next"></div>
            <div class="swiper-pagination"></div>
          </swiper>
        </v-col>
        <v-col cols="12" md="5">
          <img src="@/assets/images/vr-banner.webp" class="w-100" alt="" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination } from "swiper";
import emitter from "@/EmitterBus";

export default {
  name: "ProductSwiper",
  data() {
    return {
      showenPic: {},
      breakPoints: {
        0: {
          slidesPerView: 1,
        },
        580: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        960: {
          slidesPerView: 2,
        },
        1140: {
          slidesPerView: 3,
        },
      },
    };
  },
  methods: {
    openQuickView(product) {
      emitter.emit("openQuickView", product);
    },
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  components: {
    SwiperSlide,
    Swiper,
  },
  props: {
    newProducts: {
      type: Array,
    },
    categories: {
      type: Array,
    },
    index: {
      type: Number,
    },
  },
};
</script>
<style lang="scss" scoped>
.the-image:hover {
  .quick-btn {
    opacity: 1 !important;
  }
}
// Media Queries
@media (max-width: 580px) {
  .top-products {
    .the-image {
      height: 300px !important;
    }
    .swiper-button-next,
    .swiper-button-prev {
      top: 25% !important;
    }
  }
}
@media (max-width: 1150px) {
  .skele {
    opacity: 0;
  }
}
</style>
