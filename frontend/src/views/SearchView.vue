<template>
  <div id="search-view-loading" v-if="isLoading">
    <span>판결문을 찾고 있습니다</span>
    <loading-bounce />
  </div>
  <div v-else id="search-view">
    <div class="description-container">
      <!-- 대상 판결문 속성 -->
      <template v-if="keywords.length > 0">
        <p>
          <span class="highlight-big">{{ kindC }}</span
          >의 <span class="highlight-big">{{ kindB }}</span> 사건 중
        </p>
        <p>
          <span class="highlight">{{ keywords.join(", ") }}</span> 키워드와
          관련된 판결문을
        </p>
      </template>
      <template v-else>
        <p>
          <span class="highlight-big">{{ kindC }}</span
          >의 <span class="highlight-big">{{ kindB }}</span> 사건에 해당하는
          판결문을
        </p>
      </template>
      <!-- 찾은 개수 -->
      <p>
        <span class="highlight-big">{{ numStats["total"] }}건</span> 찾았습니다
      </p>
    </div>

    <!-- 검색결과 내 옵션 -->
    <div class="form-container">
      <card-radio
        title=""
        description="어떤 결과의 판결문을 보여드릴까요?"
        :options="apiOptions.kindA"
        :labels="apiOptions.kindALabel"
        v-model="kindA"
        @changed="onChangeKindA"
        :allowUnselect="false"
      />
      <card-radio
        title=""
        description="어떤 심급의 판결문을 보여드릴까요?"
        :options="apiOptions.courtLevel"
        :labels="apiOptions.courtLevelLabel"
        v-model="courtLevel"
        @changed="onChangeCourtLevel"
        :allowUnselect="false"
      />
    </div>

    <!-- 옵션 적용된 검색결과의 목록 -->
    <div class="item-container">
      <item-card
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @go-detail="goDetail(item)"
      />
    </div>

    <!-- 더 불러오기 -->
    <div class="fetch-more-button">
      <button-card
        text="더 불러오기"
        theme="selected"
        @click="fetchNItems(clientNumOfRows, pageFetchNumAtOnce)"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import CardRadio from "@/components/CardRadio.vue";
import LoadingBounce from "@/components/LoadingBounce.vue";
import ItemCard from "@/components/ItemCard.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import { apiOptions, apiURL, dummyData } from "@/globalConst.js";
import sleep from "@/utils/sleep.js";
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

// request params
const keywords = route.query.keywords
  .split(",")
  .filter((keyword) => keyword != "");
const kindA = ref("취소");
const kindB = route.query.kindB;
const kindC = route.query.kindC;
const numOfRows = ref(10);
const pageNum = ref(1);
const PAGE_NUM_MIN = 1;

// response data
const numStats = ref({});
const items = ref([]);

// etc state
const clientNumOfRows = 10;
const pageFetchNumAtOnce = 10;
const courtLevel = ref(0);

// init
init();

// event handlers

async function onChangeKindA() {
  pageNum.value = PAGE_NUM_MIN;
  items.value = [];
  await fetchNItems(clientNumOfRows, pageFetchNumAtOnce);
  console.log("ㅇㅇ");
}

function onChangeCourtLevel() {}

function goDetail(item) {
  router.push({
    name: "Detail",
    state: {
      item: toRaw(item),
    },
  });
}

// functions
async function fetchNItems(itemNum, pageFetchNumAtOnce) {
  // fetch n items that have keywords in their contents
  // -- itemNum: number of items to get
  // -- pageFetchNumAtOnce: number of pages to fetch at once (fetch speed)

  try {
    isLoading.value = true;

    let cntItem = 0; // how many items with keywords are fetched
    let itemsLengthBeforeLoop = items.value.length;

    // -------------------
    // for test
    await sleep(500);
    // -------------------

    while (
      cntItem < itemNum &&
      pageNum.value < numStats.value[kindA.value] / numOfRows.value + 1
    ) {
      pageNum.value += pageFetchNumAtOnce;

      // fetch
      const promises = [];
      for (let i = 1; i <= pageFetchNumAtOnce; i++) {
        promises.push(fetchPage(i));
      }
      await Promise.all(promises);

      cntItem = items.value.length - itemsLengthBeforeLoop;
      itemsLengthBeforeLoop = items.value.length;
    }

    if (cntItem < itemNum) {
      alert("더 이상 불러올 판결문이 없습니다.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function fetchPage() {
  // fetch a page regardless of keywords

  //   // real data
  //   const res = await axios.post(apiURL, {
  //     kindA: kindA,
  //     kindB: kindB,
  //     kindC: route.query.kindC,
  //     keywords: keywords,
  //     num_of_rows: numOfRows.value,
  //     page_num: pageNum.value,
  //   });

  // dummy data

  const res = { data: dummyData };
  // numStats.value = res.data.num_stats;

  // get values
  const itemsHasKeywords = res.data.items.filter(
    (item) => item.keywords_included.length > 0
  );
  items.value = [...items.value, ...itemsHasKeywords];
}

async function getNumStats() {
  try {
    isLoading.value = true;
    //   // real Data
    //   const res = await axios.post(apiURL, {
    //     kindA: kindA.value,
    //     kindB: route.query.kindB.value,
    //     kindC: route.query.kindC.value,
    //     keywords: keywords,
    //     num_of_rows: 1,
    //     page_num: 1,
    //   });

    // dummy data
    await sleep(1000);
    const res = { data: dummyData };

    // get values
    numStats.value = res.data.num_stats;
    numStats.value["total"] = Object.values(numStats.value).reduce(
      (acc, cur) => acc + cur,
      0
    );
  } catch (error) {
    console.error(error);
    alert(error);
  } finally {
    isLoading.value = false;
  }
}
async function init() {
  console.log(keywords);
  // get numStats
  await getNumStats();
  console.log(numStats.value);

  // get initial items
  await fetchNItems(clientNumOfRows, pageFetchNumAtOnce);
  console.log(items.value);
  console.log(items.value.length);
}
</script>

<style lang="scss" scoped>
#search-view-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
  height: 100%;
  font-size: 1.3rem;
  background-color: $grey-light;
}
#search-view {
  background-color: $grey-light;

  .description-container {
    padding: 3rem 2rem;
    background-color: white;
    line-height: 2rem;
    .highlight {
      font-weight: bold;
      font-size: 1.2rem;
    }
    .highlight-big {
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

  .form-container {
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;
  }

  .item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;
    padding: 2rem;
    .item-card {
      width: 49%;
    }
  }

  .fetch-more-button {
    padding: 2rem;
  }
}
</style>
