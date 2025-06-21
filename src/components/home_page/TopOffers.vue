<template>
  <div class="offers bg-grey-lighten-4 py-9">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="py-0 px-3 pr-lg-6"
          style="height: 260px"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="height: 100%; overflow: hidden; border-radius: 7px"
            >
              <img
                src="../../assets/images/playstations.webp"
                alt="Playstations photo"
                loading="lazy"
                :style="`width: 100%; height: 100%; transition: 0.7s; cursor: pointer; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="py-0 px-3 pr-lg-6 mt-5 mt-sm-0"
          style="height: 260px"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="height: 100%; overflow: hidden; border-radius: 7px"
            >
              <img
                src="../../assets/images/headset.webp"
                alt="Headset photo"
                loading="lazy"
                :style="`width: 100%; height: 100%; transition: 0.7s; cursor: pointer; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="py-0 mt-5 mt-lg-0"
          style="height: 260px"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="height: 100%; overflow: hidden; border-radius: 7px"
            >
              <img
                src="../../assets/images/chairs.webp"
                alt="Chairs photo"
                loading="lazy"
                :style="`width: 100%; height: 100%; transition: 0.7s; cursor: pointer; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
      <v-row class="mt-9">
        <v-col cols="12" sm="6" class="mt-3 px-3 pr-sm-5 py-0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="height: 100%; overflow: hidden; border-radius: 7px"
            >
              <img
                src="../../assets/images/iphones.webp"
                alt="iphones photo"
                loading="lazy"
                :style="`width: 100%; height: 100%; transition: 0.7s; cursor: pointer; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="6" class="mt-3 pl-3 pl-sm-5 py-0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="height: 100%; overflow: hidden; border-radius: 7px"
            >
              <img
                src="../../assets/images/laptops.webp"
                alt="Laptop photo"
                loading="lazy"
                :style="`width: 100%; height: 100%; transition: 0.7s; cursor: pointer; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AppLayout",
};
</script>
<style scoped lang="scss"></style>
