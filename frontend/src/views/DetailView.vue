<template>
  <div id="detail-view">
    <div class="back-nav-button">
      <span @click="goSearch">{{ `< 돌아가기` }}</span>
    </div>
    <p>{{ item }}</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// receive data from searchView
const { item } = history.state;
if (!item) {
  router.push("/");
}

// event handlers
function goSearch() {
  router.back();
}
</script>

<style lang="scss" scoped>
#detail-view {
  padding: 2rem;
  padding-top: 0;

  .back-nav-button {
    padding: 2rem 0;
    span {
      cursor: pointer;
      color: $secondary-color;
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
}
</style>
