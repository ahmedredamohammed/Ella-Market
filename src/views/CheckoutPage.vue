<template>
  <div class="checkout">
    <v-container fluid class="ma-0 pa-0">
      <v-row>
        <v-col cols="12" md="6" lg="7" class="order-1 order-md-0">
          <v-card
            style="padding: 60px 90px 0"
            class="w-100 check-left"
            elevation="0"
            color="white"
          >
            <v-card-title class="font-weight-bold pa-0"
              >new-ella-demo</v-card-title
            >
            <v-breadcrumbs
              :items="['Cart', 'Information', 'Shipping', 'Payment']"
              style="font-size: 12px; padding: 5px 0"
            >
              <template v-slot:divider>
                <v-icon color="#878484">mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
            <v-card-actions class="justify-space-between align-center my-5">
              <v-btn
                color="#6200ff"
                variant="elevated"
                class="flex-grow-1"
                style="height: 45px; padding: 0"
                ><span v-html="checkoutShop"></span
              ></v-btn>
              <v-btn
                color="black"
                variant="elevated"
                class="flex-grow-1"
                style="height: 45px; padding: 0"
                ><span v-html="checkoutGoogle"></span
              ></v-btn>
            </v-card-actions>
            <v-divider length="100%" color="blue"></v-divider>
            <v-divider length="100%" color="blue"></v-divider>
            <v-divider length="100%" color="blue"></v-divider>
            <v-card-title
              style="
                margin: 20px 0;
                padding: 5px 0 0;
                font-size: 14px;
                font-weight: 700;
                color: #484848;
                white-space: pre-wrap;
                line-height: 1.2;
              "
              >Shipping Addresses</v-card-title
            >
            <select
              name="country"
              id=""
              class="w-100 pa-3"
              style="
                color: #777;
                border: 1px solid #77777775;
                border-radius: 3px;
                font-size: 14px;
              "
            >
              <option
                :value="country"
                v-for="country in countries"
                :key="country"
              >
                {{ country }}
              </option>
            </select>
            <div
              class="user-name d-flex align-center justify-center my-4"
              style="gap: 15px"
            >
              <div class="w-100 d-flex align-start" style="gap: 15px">
                <div class="w-50 d-flex flex-column align-start">
                  <input
                    type="text"
                    v-model="data.firstName"
                    name="first-name"
                    class="w-100 pa-3"
                    placeholder="First Name"
                    @input="v$.firstName.$touch()"
                  />
                  <span v-for="err in v$.firstName.$errors" :key="err.$uid">
                    <span
                      class="the-error"
                      v-if="(err.$property = 'firstName')"
                      >{{ err.$message }}</span
                    >
                  </span>
                </div>
                <div class="w-50 d-flex flex-column align-start">
                  <input
                    type="text"
                    name="last-name"
                    v-model="data.lastName"
                    class="w-100 pa-3"
                    placeholder="Last Name"
                    @input="v$.lastName.$touch()"
                  />
                  <span v-for="err in v$.lastName.$errors" :key="err.$uid">
                    <span
                      class="the-error"
                      v-if="(err.$property = 'lastName')"
                      >{{ err.$message }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
            <input
              type="text"
              name="address"
              class="w-100 pa-3 mb-4"
              placeholder="Address"
            />
            <input
              type="text"
              name="apartment"
              class="w-100 pa-3 mb-4"
              placeholder="Apartment"
            />
            <div
              class="country d-flex align-center justify-space-between mb-4"
              style="gap: 15px"
            >
              <input
                type="text"
                name="city"
                class="w-100 pa-3"
                placeholder="City"
              />
              <select
                name="country"
                id=""
                class="w-100 pa-3"
                style="
                  color: #000;
                  border: 1px solid #77777775;
                  border-radius: 3px;
                  font-size: 14px;
                "
              >
                <option
                  :value="country"
                  v-for="country in countries"
                  :key="country"
                >
                  {{ country }}
                </option>
              </select>
              <input
                type="text"
                name="first-name"
                class="w-100 pa-3"
                placeholder="Postal code"
              />
            </div>
            <v-card-actions class="justify-end mt-3 mb-7">
              <v-btn
                variant="elevated"
                width="150"
                height="45"
                color="#1677b0"
                @click="formValidate"
                >Submit</v-btn
              >
            </v-card-actions>
            <v-divider length="100%" color="blue"></v-divider>
            <v-divider length="100%" color="blue"></v-divider>
            <v-divider length="100%" color="blue"></v-divider>
            <v-card-text style="font-size: 10px; color: #777"
              >All Rights Reserved new-ella-demo</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="5">
          <v-card
            class="bg-grey-lighten-4 check-right"
            elevation="0"
            width="100%"
            min-height="300"
            style="padding: 60px 90px 0"
            height="100%"
          >
            <v-card
              elevation="0"
              width="100%"
              v-for="product in catrItems"
              :key="product.id"
              class="bg-transparent d-flex align-center justify-space-between py-3 mb-3"
              style="gap: 15px"
            >
              <v-badge
                :content="product.quantity"
                color="blue"
                location="right top"
              >
                <img
                  :src="product.thumbnail"
                  width="50"
                  height="50"
                  alt=""
                  style="border-radius: 7px; border: 1px solid #77777777"
                />
              </v-badge>
              <div class="text-content flex-grow-1">
                <v-card-title
                  style="
                    padding: 5px 0 0;
                    font-size: 14px;
                    font-weight: 700;
                    color: #484848;
                    white-space: pre-wrap;
                    line-height: 1.2;
                  "
                  >({{ product.title }}) Sample - {{ product.category }} For
                  Sale</v-card-title
                >
                <v-card-text
                  style="
                    font-size: 12px;
                    padding: 0;
                    color: #777777;
                    white-space: pre-wrap;
                  "
                  >{{ product.category }}</v-card-text
                >
              </div>
              <v-card-text
                class="flex-grow-0"
                style="font-weight: 400; font-size: 13px"
              >
                ${{
                  Math.ceil(
                    product.price -
                      product.price * (product.discountPercentage / 100)
                  ) * product.quantity
                }}
              </v-card-text>
            </v-card>
            <v-divider length="100%" color="blue"></v-divider>
            <v-divider length="100%" color="blue"></v-divider>
            <v-card-text
              class="d-flex align-center justify-space-between font-weight-bold"
            >
              <span>Total</span>
              <span>${{ calcTotalPrice }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <OrderSuccess :popup="dialog" v-if="dialog" @close-popup="handleEvent" />
  </div>
</template>
<script setup>
import { cartStore } from "@/stores/Cart";
import { svgs } from "@/stores/SVGs";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import OrderSuccess from "@/components/order-success/OrderSuccess.vue";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  minLength,
  maxLength,
  alpha,
} from "@vuelidate/validators";

const theCartStore = cartStore();
const { catrItems } = storeToRefs(theCartStore);

const svgsStore = svgs();
const { checkoutShop, checkoutGoogle } = svgsStore;

const countries = ref(["Palestine", "Egypt", "Seria", "Soudan"]);

const calcTotalPrice = computed(() => {
  let total = 0;
  catrItems.value.forEach((item) => {
    total +=
      Math.ceil(item.price - item.price * (item.discountPercentage / 100)) *
      item.quantity;
  });
  return total;
});
// Form Validation
const data = ref({
  firstName: "",
  lastName: "",
});
const roles = ref({
  firstName: {
    required: helpers.withMessage("Please, Enter Your First Name", required),
    minLength: helpers.withMessage("Name is too short", minLength(3)),
    maxLength: helpers.withMessage("Name is too long", maxLength(10)),
    alpha: helpers.withMessage("There is invalid value", alpha),
  },
  lastName: {
    required: helpers.withMessage("Please, Enter Your Last Name", required),
    minLength: helpers.withMessage("Name is too short", minLength(3)),
    maxLength: helpers.withMessage("Name is too long", maxLength(10)),
    alpha: helpers.withMessage("There is invalid value", alpha),
  },
});
const v$ = useVuelidate(roles, data);

const formValidate = async () => {
  const res = await v$.value.$validate();
  if (res) {
    v$.value.$reset();
    dialog.value = true;
    data.value = {
      firstName: "",
      lastName: "",
    };
  }
};

const dialog = ref(false);
const handleEvent = (close) => {
  dialog.value = close;
};
</script>

<style lang="scss" scoped>
select {
  outline: none;
}
input {
  color: #777;
  border: 1px solid #77777775;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
}
.the-error {
  font-size: 12px;
  color: indianred;
  padding: 5px 10px;
}
// Media Query
@media (max-width: 1280px) {
  .check-left {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
  .check-right {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}
</style>
