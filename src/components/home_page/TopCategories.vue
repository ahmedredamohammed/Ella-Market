<template>
  <div class="top-catigoies">
    <div class="cyber">
      <img src="@/assets/images/cyber-banner.webp" alt="" class="w-100" />
    </div>
    <div class="categories pt-13">
      <div class="title d-flex align-center justify-center px-5 mb-3">
        <h3
          class="text-center flex-grow-1"
          style="font-size: 20px; font-weight: 900"
        >
          Top Categories
        </h3>
      </div>
      <v-container fluid>
        <v-row>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="cat in categories"
            :key="cat.title"
          >
            <v-card elevation="0" class="text-center py-3 px-2">
              <v-hover v-slot="{ isHovering, props }">
                <div
                  class="image"
                  style="
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                    border-radius: 50%;
                  "
                >
                  <img
                    :src="cat.image"
                    alt=""
                    :style="`height: 100%; width: 100%; cursor: pointer; transition: 0.5s all ease-in-out; transform: scale(${
                      isHovering ? 1.05 : 1
                    })`"
                    v-bind="props"
                  />
                </div>
              </v-hover>
              <v-card-text>{{ cat.title }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopCats",
  data() {
    return {
      categories: [
        {
          title: "Mobile Phones",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/mobile-phones.png?v=10616357514144629263",
        },
        {
          title: "Labtops & Tablets",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/laptops-tablets.png?v=17546078654541140209",
        },
        {
          title: "Televisions",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/televisions.png?v=792225267698738137",
        },
        {
          title: "PCs & Accessories",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/pcs-accessories.png?v=7913320403362682840",
        },
        {
          title: "Audio & Video",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/audio-video.png?v=17118273463527967791",
        },
        {
          title: "Gaming & Accessories",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635",
        },
        {
          title: "Home Appliances",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/home-appliances.png?v=4122646624966862882",
        },
        {
          title: "Kitchen Appliances",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/kitchen-appliances.png?v=912885117927234410",
        },
        {
          title: "Cameras",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/cameras.png?v=10468174360605840515",
        },
        {
          title: "Consumables",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/consumables.png?v=1604898607781595964",
        },
        {
          title: "Smart Homes",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/smart-homes.png?v=11511407578445752828",
        },
        {
          title: "Accessories",
          image:
            "https://new-ella-demo.myshopify.com/cdn/shop/files/accessories.png?v=16090558546215869367",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss"></style>
