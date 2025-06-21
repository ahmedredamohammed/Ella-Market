<template>
  <div class="products-swiper pt-16 mb-8">
    <div class="title mb-10 px-5 d-flex align-center justify-space-between">
      <h2
        :class="[`text-${titleColor}`]"
        style="font-size: 30px; font-weight: 900"
      >
        {{ title }}
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
    <v-conatiner class="pb-9" fluid v-if="!flashDeals.length">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="n in 4" :key="n">
          <v-skeleton-loader
            class="pa-5"
            type="image, article, button"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-conatiner>
    <swiper
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :modules="modules"
      :slides-per-view="4"
      :space-between="30"
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :breakpoints="breakPoints"
      :loop="true"
      :navigation="{
        prevIcon: '.swiper-prev',
        nextIcon: '.swiper-next',
      }"
      class="pb-9"
    >
      <swiper-slide v-for="product in flashDeals" :key="product.id">
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
                : `(${product.title}) ${product.description}`.substring(0, 65) +
                  "..."
            }}
          </v-card-text>
          <v-rating
            v-model="product.rating"
            half-increments
            readonly
            color="yellow-darken-2"
            size="x-small"
            density="cobact"
          ></v-rating>
          <v-card-text class="pl-0 pt-1 text-grey-lighten-1 text-subtitle-1">
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
              class="px-16 py-2"
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
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

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
        990: {
          slidesPerView: 4,
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
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  components: {
    SwiperSlide,
    Swiper,
    VSkeletonLoader,
  },
  props: {
    flashDeals: {
      type: Array,
    },
    categories: {
      type: Array,
    },
    title: {
      type: String,
    },
    titleColor: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
};
</script>
<style scoped lang="scss">
.products-swiper {
  > .swiper-next,
  .swiper-prev {
    .swiper-button-next,
    .swiper-button-prev {
      position: absolute;
      top: 50%;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 2px solid rgb(95, 95, 95);
      background-color: white;
      z-index: 10000;
      &::after {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px !important;
        font-weight: bold;
        color: rgb(95, 95, 95);
      }
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .the-image:hover {
    .quick-btn {
      opacity: 1 !important;
    }
  }
}
// Media Queries
@media (max-width: 580px) {
  .products-swiper {
    .the-image {
      height: 300px !important;
    }
    .swiper-button-next,
    .swiper-button-prev {
      top: 25% !important;
    }
  }
}
</style>
