<template>
  <div class="quality py-13 bg-grey-lighten-3">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          lg=""
          v-for="card in cards"
          :key="card.id"
          class="px-2"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="text-center d-flex align-center justify-center px-4"
              height="300"
              v-bind="props"
              style="cursor: pointer; transition: 0.7s"
              :elevation="isHovering ? 2 : 0"
              :color="isHovering ? 'blue-lighten-4' : 'white'"
            >
              <div class="parent">
                <span v-html="card.svg"></span>
                <v-card-title
                  style="
                    font-weight: 700;
                    font-size: 16px;
                    text-transform: uppercase;
                  "
                  >{{ card.title }}</v-card-title
                >
                <v-card-text>{{ card.desc }}</v-card-text>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { qualityCard } from "@/stores/QualityCard";
const store = qualityCard();
const { cards } = store;
</script>
