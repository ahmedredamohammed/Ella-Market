<template>
  <div class="layout">
    <v-layout class="position-relative">
      <SideCard :windowWidth="windowWidth" />
      <MenuDrawer :windowWidth="windowWidth" />
      <v-main
        :style="`padding-top: ${
          $route.name == 'check-out'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '159px'
        }`"
      >
        <slot></slot>
      </v-main>
      <AppNavBar v-show="windowWidth > 990 && $route.name != 'check-out'" />
      <ResponsiveNav
        v-show="windowWidth <= 990 && $route.name != 'check-out'"
      />
      <FixedNav v-show="windowWidth > 990 && $route.name != 'check-out'" />
      <AppFooter v-show="$route.name != 'check-out'" />
    </v-layout>
  </div>
</template>
<script setup>
import AppNavBar from "@/components/global/AppNavBar.vue";
import AppFooter from "@/components/global/AppFooter.vue";
import SideCard from "@/components/global/SideCard.vue";
import FixedNav from "./FixedNav.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import MenuDrawer from "./MenuDrawer.vue";

import { ref, onMounted } from "vue";

const windowWidth = ref(0);
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.onresize = () => {
    windowWidth.value = window.innerWidth;
  };
});
</script>
<style scoped lang="scss"></style>
