<template>
  <v-footer :app="true" elevation="0" color="#f5f5f5" class="pt-10" absolute>
    <v-container fluid class="px-0">
      <v-row class="pb-10 px-0">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card elevation="0" color="transparent">
            <v-card-title
              style="
                font-size: 14px;
                font-weight: 900;
                text-transform: uppercase;
              "
              class="px-0 pb-3"
              >shop</v-card-title
            >
            <v-card-text
              class="footerLinks"
              v-for="cat in categories"
              :key="cat.title"
            >
              <router-link
                :to="{
                  name: 'product-category',
                  query: { category: cat.router, title: cat.title },
                }"
                style="text-decoration: none; color: #494949"
              >
                {{ cat.title }}
              </router-link>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card elevation="0" color="transparent">
            <v-card-title
              style="
                font-size: 14px;
                font-weight: 900;
                text-transform: uppercase;
              "
              class="px-0 pb-3"
              >further info</v-card-title
            >
            <v-card-text class="footerFeatures">About</v-card-text>
            <v-card-text class="footerFeatures">Customer Service</v-card-text>
            <v-card-text class="footerFeatures">Reward Program</v-card-text>
            <v-card-text class="footerFeatures">Shippimg & Returns</v-card-text>
            <v-card-text class="footerFeatures"></v-card-text>
            <v-card-text class="footerFeatures">Terms & Conditions</v-card-text>
            <v-card-text class="footerFeatures">Blog</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card elevation="0" color="transparent">
            <v-card-title
              style="
                font-size: 14px;
                font-weight: 900;
                text-transform: uppercase;
              "
              class="px-0 pb-3"
              >customer service</v-card-title
            >
            <v-card-text class="footerFeatures">Search Terms</v-card-text>
            <v-card-text class="footerFeatures">Advanced Search</v-card-text>
            <v-card-text class="footerFeatures">Orders And Returns</v-card-text>
            <v-card-text class="footerFeatures">Contact Us</v-card-text>
            <v-card-text class="footerFeatures">Theme FAQs</v-card-text>
            <v-card-text class="footerFeatures">Consultant</v-card-text>
            <v-card-text class="footerFeatures">Store Locations</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card elevation="0" color="transparent">
            <img
              src="@/assets/images/footer-logo.webp"
              class="my-4"
              alt=""
              @click="goToHome"
              style="cursor: pointer"
            />
            <v-card-text
              class="d-flex align-center justify-start px-0 py-2"
              style="gap: 10px"
            >
              <span v-html="location"></span>
              <span>685 Market Street, San Francisco, CA 94105, US</span>
            </v-card-text>
            <v-card-text
              class="d-flex align-center justify-start px-0 py-2"
              style="gap: 10px"
            >
              <span v-html="phone"></span>
              <span>Call us at (415) 555-5555</span>
            </v-card-text>
            <v-card-text
              class="d-flex align-center justify-start px-0 py-2"
              style="gap: 10px"
            >
              <span v-html="message"></span>
              <span>example@domain.com</span>
            </v-card-text>
            <v-card-text
              class="d-flex flex-row align-center justify-start px-0"
              style="gap: 20px"
            >
              <span
                v-for="social in socialLinks"
                :key="social"
                v-html="social"
                style="
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  background-color: rgb(69, 69, 69);
                "
              ></span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="py-3 px-0">
        <v-col cols="12" class="text-center bg-white">
          <img
            src="@/assets/images/cart-page-cards.webp"
            class="w-50 w-sm-50 my-3"
            alt=""
          />
        </v-col>
      </v-row>
      <v-row class="px-0">
        <v-col cols="12" md="6" class="text-md-start text-center">
          <p style="font-size: 13px; color: #777">
            &copy; {{ new Date().getFullYear() }} Ella Demo. All Rights
            Reserved. Powered By EL-MONGY
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-end">
          <div
            class="payments d-flex align-center justify-center justify-md-end"
            style="gap: 12px"
          >
            <span v-for="item in paymentWays" :key="item" v-html="item"></span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script setup>
import { footerSvgs } from "@/stores/FooterSvgs";
import { productsModule } from "@/stores/Products";
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push({ name: "home" });
};

const catStore = productsModule();
const { categories } = catStore;

const store = footerSvgs();
const {
  facebook,
  instagram,
  pinterest,
  snap,
  twitter,
  visa,
  master,
  pay,
  discover,
  paypal,
  shopPay,
  location,
  phone,
  message,
} = store;
const socialLinks = [facebook, instagram, pinterest, snap, twitter];
const paymentWays = [visa, master, pay, discover, paypal, shopPay];
</script>
<style lang="scss" scoped>
.footerLinks {
  cursor: pointer;
}
.footerLinks,
.footerFeatures {
  padding: 8px 0;
  color: #494949 !important;
  width: fit-content;
  font-size: 14px;
}
</style>
