<template>
  <div class="item-card">
    <p class="preview">{{ item.preview }}</p>
    <div class="info">
      <p class="title">{{ item.title }}</p>
      <p class="accnum">{{ item.accnum }}</p>
      <p class="court-name">{{ item.court_name }}</p>
    </div>
    <div class="detail-button">
      <span @click="goDetail">{{ `자세히 보기 >` }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});
const emits = defineEmits(["go-detail"]);

function goDetail() {
  emits("go-detail");
}
</script>

<style lang="scss" scoped>
.item-card {
  padding: 2rem;
  background-color: white;
  border: 1px solid $grey-medium;
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  .preview {
    font-size: 0.85rem;
    line-height: 1.1rem;
  }
  .info {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    color: $grey-strong;
    font-size: 0.8rem;
  }
  .detail-button {
    text-align: right;
    padding-top: 1rem;
    span {
      padding: 0.5rem;
      cursor: pointer;
      color: $secondary-color;
      font-size: 1rem;
      font-weight: bold;
    }
  }

  &:hover {
    background-color: $tertiary-color;
  }
}
</style>
