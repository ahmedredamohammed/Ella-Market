<template>
  <AppLayout>
    <router-view />
    <QuickView />
    <v-snackbar
      v-model="bar"
      location="left bottom"
      color="green"
      max-width="280"
      timeout="3000"
    >
      {{ itemAdded }} has been added to your card successfuly!
      <template v-slot:actions>
        <v-icon @click="bar = false">mdi-close</v-icon>
      </template>
    </v-snackbar>
  </AppLayout>
</template>

<script setup>
import AppLayout from "./components/global/AppLayout.vue";
import QuickView from "@/components/global/QuickView.vue";
import emitter from "./EmitterBus";
import { ref, onMounted } from "vue";

const bar = ref(false);
const itemAdded = ref(false);
onMounted(() => {
  emitter.on("showMsg", (data) => {
    itemAdded.value = data;
    bar.value = true;
  });
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --swiper-navigation-size: 25px;
  color: #2c3e50;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-rating__wrapper {
  margin-right: 5px;
}
</style>
