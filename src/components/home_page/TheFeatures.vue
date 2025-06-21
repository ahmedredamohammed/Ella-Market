<template>
  <div class="features">
    <v-container>
      <v-row>
        <v-col
          class="d-flex align-center justify-center flex-column flex-sm-row"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <span v-html="shipping" class="mb-3 mb-sm-0"></span>
          <span class="pl-3" style="font-weight: bold"
            >Free Shopping & Returns</span
          >
        </v-col>
        <v-col
          class="d-flex align-center justify-center second flex-column flex-sm-row"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <span v-html="award" class="mb-3 mb-sm-0"></span>
          <span class="pl-3" style="font-weight: bold"
            >Lowest Price Guarantee</span
          >
        </v-col>
        <v-col
          class="d-flex align-center justify-center flex-column flex-sm-row"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <span v-html="trophy" class="mb-3 mb-sm-0"></span>
          <span class="pl-3" style="font-weight: bold"
            >Longest Warranties Offer</span
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { svgs } from "@/stores/SVGs";
const store = svgs();
const { shipping, award, trophy } = store;
</script>
<style scoped lang="scss">
.features {
  .second {
    position: relative;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: 1px;
      background-color: #777;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
}
// Media Queries
@media (max-width: 600px) {
  .features {
    .second {
      &::after,
      &::before {
        display: none;
      }
    }
  }
}
</style>
