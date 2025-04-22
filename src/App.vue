<script setup>
import Contents from "./components/Contents.vue";

// .envから環境変数を取得
const env = import.meta.env.VITE_APP_ENV;
</script>

<template>
  <div v-if="env !== 'production'" class="env-label">{{ env }}</div>
  <div class="layout">
    <div class="main">
      <a href="https://craftwiz.jp/" target="_blank">
        <img src="./assets/バナー_透過.png" />
      </a>
      <h2>つくったものおきば</h2>
      <div>
        <Contents />
      </div>
    </div>
  </div>
</template>

<style scoped>
.env-label {
  background: #9c9c9c;
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.layout {
  margin: 2rem;
}
.main {
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
</style>
