<template>
  <div class="fixed-nav">
    <v-app-bar class="m-0 p-0" color="#02218f" height="fit-content">
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <img
              class="w-50"
              src="@/assets/images/logo.png"
              alt=""
              @click="goToHome"
              style="cursor: pointer"
            />
          </v-col>
          <v-col cols="7" class="d-flex align-center justify-start">
            <ul class="d-flex align-center" style="list-style: none; gap: 30px">
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
            cols="3"
            class="d-flex align-center justify-end"
            style="gap: 30px"
            @click="openCard"
          >
            <span v-html="searchTwo"></span>
            <div
              class="d-flex flex-column align-center cursor-pointer"
              :style="`cursor: pointer; pointer-events: ${
                router.currentRoute['_rawValue'].name == 'cart-page'
                  ? 'none'
                  : 'unset'
              }`"
            >
              <v-badge
                color="red"
                location="top right"
                :content="catrItems.length"
                v-if="catrItems.length"
                offsetX="-12"
              ></v-badge>
              <span v-html="cart"></span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>
<script setup>
import { svgs } from "@/stores/SVGs";
import { getCurrentInstance } from "vue";
import { productsModule } from "@/stores/Products";
import { cartStore } from "@/stores/Cart";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();

const goToHome = () => {
  router.push({ name: "home" });
};

const catStore = productsModule();
const { categories } = catStore;

const theCatStore = cartStore();
const { catrItems } = storeToRefs(theCatStore);

const store = svgs();
const { cart, searchTwo } = store;

const emitter =
  getCurrentInstance().appContext.config.globalProperties.$emitter;
const openCard = () => {
  emitter.emit("openCard");
};
</script>
<style scoped lang="scss"></style>
