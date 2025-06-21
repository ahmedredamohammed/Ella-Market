<template>
  <div class="res-nav">
    <v-app-bar>
      <v-container fluid>
        <v-row class="align-center">
          <v-col cols="4">
            <div class="d-flex align-center">
              <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
              <span v-html="search2" style="cursor: pointer"></span></div
          ></v-col>
          <v-col cols="4" class="text-center">
            <img
              src="@/assets/images/footer-logo.webp"
              alt=""
              @click="$router.push({ name: 'home' })"
              style="cursor: pointer; width: 130px"
          /></v-col>
          <v-col cols="4" class="d-flex justify-end">
            <span v-html="resAccount" class="mr-7"></span>
            <span
              v-html="resCart"
              @click="openCard"
              style="cursor: pointer; padding: 0"
            ></span>
            <v-badge
              color="#639eff"
              location="right top"
              :content="catrItems.length"
              v-if="catrItems.length"
            ></v-badge>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>
<script setup>
import { svgs } from "@/stores/SVGs";
import { cartStore } from "@/stores/Cart";
import { storeToRefs } from "pinia";
import emitter from "@/EmitterBus";

const svgsStore = svgs();
const theCartStore = cartStore();
const { search2, resCart, resAccount } = svgsStore;
const { catrItems } = storeToRefs(theCartStore);

const openCard = () => {
  emitter.emit("openCard");
};
const openMenu = () => {
  emitter.emit("openMenu");
};
</script>
