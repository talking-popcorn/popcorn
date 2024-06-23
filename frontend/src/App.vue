<template>
  <div id="app-root">
    <app-header></app-header>
    <router-view class="router-view"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

import AppHeader from "@/layouts/AppHeader.vue";
import AppFooter from "@/layouts/AppFooter.vue";
</script>

<style lang="scss" scoped>
#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Gowun Batang", serif;
}

.router-view {
  flex: 1;
}
</style>
