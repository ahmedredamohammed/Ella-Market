<template>
  <div class="menu-drawer">
    <v-navigation-drawer
      v-model="MenuDrawer"
      @openMenu="controlMenu"
      temporary
      :width="windowWidth <= 767 ? windowWidth / 2 : 370"
      class="px-2 px-sm-5 pt-0"
    >
      <v-card elevation="0" class="px-0">
        <v-card-title
          class="pl-0 pr-2 d-flex align-center justify-space-between"
          style="font-size: 20px; font-weight: bold"
          >Menu
          <v-icon size="20" @click="MenuDrawer = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-list>
          <v-list-item
            class="px-0"
            v-for="cat in categories"
            :key="cat.router"
            style="cursor: pointer"
            @click="
              $router.push({
                name: 'product-category',
                query: { category: cat.router, title: cat.title },
              })
            "
          >
            <v-list-item-title class="nav-link">{{
              cat.title
            }}</v-list-item-title></v-list-item
          >
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" class="px-0">
                <v-list-item-title class="nav-link"
                  >Languages</v-list-item-title
                >
              </v-list-item>
            </template>
            <v-list-item>
              <v-list-item-title class="d-flex align-center nav-link">
                <span v-html="enIcon"></span>
                <span class="ml-3">English</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center nav-link">
                <span v-html="deIcon"></span>
                <span class="ml-3">Deutsch</span>
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list></v-card
      >
    </v-navigation-drawer>
  </div>
</template>
<script setup>
import emitter from "@/EmitterBus";
import { onMounted, ref, defineProps } from "vue";
import { productsModule } from "@/stores/Products";
import { svgs } from "@/stores/SVGs";
import { toRefs } from "vue";

const props = defineProps({
  windowWidth: Number,
});
const { windowWidth } = toRefs(props);

const store = productsModule();
const { categories } = store;

const svgsStore = svgs();
const { enIcon, deIcon } = svgsStore;

const MenuDrawer = ref(false);
const controlMenu = () => {
  MenuDrawer.value = true;
};
onMounted(() => {
  emitter.on("openMenu", controlMenu);
});
</script>
<style lang="scss" scoped>
@media (max-width: 580px) {
  .nav-link {
    font-size: 15px;
  }
}
</style>
