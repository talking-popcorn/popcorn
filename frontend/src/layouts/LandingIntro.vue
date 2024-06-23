<template>
  <div class="landing-intro">
    <div class="part-first">
      <p style="animation-delay: 1s">
        막막한 산업재해 소송 준비 <span style="font-size: 3rem">🤦</span>
      </p>
      <p style="animation-delay: 1.5s">판례를 살펴보는 것 부터 시작하세요</p>
    </div>
    <div class="part-second">
      <p style="animation-delay: 2s" class="highlight">
        <span style="font-size: 2rem">✔</span> 간단한 선택만 하시고, 나머지는
        저희에게 맡겨두세요
      </p>
      <p style="animation-delay: 2.25s">
        산업재해 판결문을 <span class="highlight">쉬운 말로 요약</span>해
        보여드립니다
      </p>
      <p style="animation-delay: 2.5s">
        내 상황과 비슷한 사건들의 <span class="highlight">승소율</span>도
        살펴보세요
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.landing-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  color: $tertiary-color;
  background-color: $primary-color;
  width: 100%;
  animation: fadeInBackground 1s ease-in-out;

  div {
    text-align: center;
    line-height: 2.5rem;
    padding: 1rem 0;
    width: 100%;
    color: white;
  }

  p {
    animation: fadeInText 0.5s ease-in-out;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  .highlight {
    color: white;
    font-weight: bold;
    font-size: 1rem;
  }

  .part-first {
    font-family: "East Sea Dokdo", sans-serif;
    font-size: 3rem;
    // font-weight : bold;
  }

  .part-second {
    font-size: 1rem;

    font-family: "Gowun Batang", serif;
    color: $tertiary-color;
  }

  // top to bottom fade in animation
  @keyframes fadeInBackground {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      // height: fit-content;
    }
  }
  @keyframes fadeInText {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
