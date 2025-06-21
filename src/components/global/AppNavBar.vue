<template>
  <div class="new-nav-bar">
    <v-app-bar color="#02218f" height="fit-content" absolute>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <img
              src="@/assets/images/logo.png"
              alt=""
              @click="goToHome"
              style="cursor: pointer"
            />
          </v-col>
          <v-col cols="5">
            <div class="position-relative" style="width: 90%">
              <input
                type="search"
                class="searching-field"
                name="searching"
                id="searching"
                placeholder="Search The Store"
                style="
                  width: 100%;
                  background-color: #eee;
                  border: none;
                  outline: none;
                  border-radius: 30px;
                  padding: 10px 15px;
                  caret-color: blue;
                "
              />
              <span v-html="search"></span>
            </div>
          </v-col>
          <v-col cols="4" class="pl-16">
            <div class="parent d-flex align-center justify-space-between">
              <div class="d-flex flex-column align-center">
                <span>Available 24/7 at</span>
                <strong>(090) 123-4567</strong>
              </div>
              <div class="d-flex flex-column align-center cursor-pointer">
                <span v-html="wishlist"></span>
                <span style="color: #ffb547; margin-top: 7px">Wish List</span>
              </div>
              <div class="d-flex flex-column align-center cursor-pointer">
                <span v-html="account"></span>
                <span style="color: #ffb547; margin-top: 7px">Sign In</span>
              </div>
              <div
                @click="openCard"
                class="d-flex flex-column align-center"
                :style="`cursor: pointer; pointer-events: ${
                  router.currentRoute['_rawValue'].name == 'cart-page'
                    ? 'none'
                    : 'unset'
                }`"
              >
                <v-badge
                  color="#205dc2"
                  location="top right"
                  offsetX="-12"
                  :content="catrItems.length"
                  v-if="catrItems.length"
                ></v-badge>
                <span v-html="cart"></span>
                <span style="color: #ffb547; margin-top: 7px">Cart</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-6">
          <v-col cols="8">
            <ul
              class="d-flex align-center justify-space-between"
              style="list-style: none"
            >
              <li v-for="cat in categories" :key="cat.title">
                <router-link
                  :to="{
                    name: 'product-category',
                    query: { category: cat.router, title: cat.title },
                  }"
                  style="color: white; text-decoration: none"
                >
                  {{ cat.title }}
                </router-link>
              </li>
            </ul>
          </v-col>
          <v-col
            cols="4"
            class="d-flex align-center justify-end"
            style="gap: 35px"
          >
            <div class="d-flex align-center justify-center cursor-pointer">
              <span v-html="headset"></span>
              <span>Help</span>
            </div>
            <div
              class="lang d-flex align-center justify-center cursor-pointer"
              style="gap: 10px"
              id="language-btn"
            >
              <span v-html="currentLanguage[0].icon"></span>
              <span
                >{{ currentLanguage[0].lang }} /
                {{ currentLanguage[0].currency }}
                <v-icon>mdi-chevron-down</v-icon></span
              >
              <v-menu activator="#language-btn">
                <v-list v-model:selected="currentLanguage" mandatory>
                  <v-list-item
                    v-for="lang in selectedLAngs"
                    :key="lang.lang"
                    :value="lang"
                  >
                    <v-list-item-title
                      class="d-flex align-center"
                      style="gap: 10px"
                    >
                      <span v-html="lang.icon"></span>
                      {{ lang.lang }} / {{ lang.currency }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { productsModule } from "@/stores/Products";
import { cartStore } from "@/stores/Cart";
import { svgs } from "@/stores/SVGs";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();

const goToHome = () => {
  router.push({ name: "home" });
};

const catStore = productsModule();
const theCartStore = cartStore();

const { categories } = storeToRefs(catStore);
const { catrItems } = storeToRefs(theCartStore);

const store = svgs();
const { search, wishlist, account, cart, headset, deIcon, enIcon } =
  storeToRefs(store);

const currentLanguage = ref([
  {
    icon: enIcon,
    lang: "En",
    currency: "USD",
  },
]);
const selectedLAngs = ref([
  {
    icon: enIcon,
    lang: "En",
    currency: "USD",
  },
  {
    icon: deIcon,
    lang: "De",
    currency: "EURO",
  },
]);
const emitter =
  getCurrentInstance().appContext.config.globalProperties.$emitter;
const openCard = () => {
  emitter.emit("openCard");
};
</script>
