<template>
  <div class="success">
    <v-dialog v-model="dialog" width="50%" class="the-dialog" persistent>
      <v-card elevation="0" class="text-center pa-7 big-card">
        <div class="text-center">
          <v-icon
            size="50"
            color="green"
            style="
              background-color: white;
              color: green;
              width: 100px;
              height: 100px;
              font-size: 76px;
              border-radius: 50%;
              border: 1px solid #e1e5e9;
            "
            >mdi-check</v-icon
          >
        </div>
        <v-card-title
          class="text"
          style="font-weight: bold; color: rgb(93, 93, 93)"
          >Order Placed Successfuly!</v-card-title
        >
        <v-card-text style="font-size: 17px; color: rgb(93, 93, 93)"
          >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
          voluptates distinctio ad, placeat deleniti delectus unde? Non atque
        </v-card-text>
        <v-card-actions class="justify-center mt-5">
          <v-btn variant="elevated" color="blue" @click="clear">Got It!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import { cartStore } from "@/stores/Cart";
import { useRouter } from "vue-router";

const emit = defineEmits(["close-popup"]);
const router = useRouter();

const store = cartStore();
const { resetData } = store;

const clear = () => {
  resetData();
  dialog.value = false;
  router.push({ name: "home" });
};

const props = defineProps({
  popup: Boolean,
});
const dialog = ref(false);

watch(dialog, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      emit("close-popup", false);
    }, 500);
  }
});
onMounted(() => {
  dialog.value = props.popup;
});
</script>
