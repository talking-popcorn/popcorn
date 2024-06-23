<template>
  <div class="main-view">
    <!-- 인트로 -->
    <landing-intro />

    <!-- 옵션 선택기 -->
    <div class="form-container">
      <!-- kindC -->
      <card-radio
        title=""
        description="사고와 질병 중 어떤 상황이신가요?"
        :options="apiOptions.kindC"
        :labels="apiOptions.kindCLabel"
        v-model="kindC"
      />
      <!-- kindB -->
      <card-radio
        title=""
        description="어떤 유형에 대한 문제를 겪고 계신가요?"
        :options="apiOptions.kindB"
        :labels="apiOptions.kindBLabel"
        v-model="kindB"
      />
      <!-- search keywords -->
      <keyword-input
        description="특별히 관심 있는 키워드가 있다면 알려주세요 (병명, 사고 상황 등)"
        v-model="keywords"
      />
      <!-- search(submit) button -->
      <button-card
        text="🔍 판례 보기"
        theme="selected"
        @click="goSearch"
        style="font-size: 1.5rem; margin: 2rem 0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LandingIntro from "../layouts/LandingIntro.vue";
import CardRadio from "@/components/CardRadio.vue";
import KeywordInput from "@/components/KeywordInput.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import { apiOptions } from "@/globalConst.js";
import { useRouter } from "vue-router";

const kindB = ref(""); // case type
const kindC = ref(""); // '업무상사고', '업무상질병'
const keywords = ref([]);

const router = useRouter();
function goSearch() {
  // validation
  if (kindB.value === "" || kindC.value === "") {
    alert("모든 항목을 선택해주세요.");
    return;
  }

  // replace router view to SearchView with query params
  router.push({
    name: "Search",
    query: {
      kindB: kindB.value,
      kindC: kindC.value,
      keywords: keywords.value.join(","),
    },
  });
}
</script>

<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-direction: column;

  background-color: $grey-light;

  .form-container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;

    opacity: 0;
    animation: fadeIn 1.5s ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      // height: fit-content;
    }
  }
}
</style>
