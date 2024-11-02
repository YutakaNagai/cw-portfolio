<script setup>
import Contents from "./components/Contents.vue";
</script>

<template>
  <div class="env">staging</div>
  <div class="main">
    <a href="https://craftwiz.jp/" target="_blank">
      <img src="./assets/バナー_透過.png" />
    </a>
    <h2>つくったものおきば</h2>
    <div>
      <Contents />
    </div>
  </div>
</template>

<style scoped>
.env {
  background: #9c9c9c;
}
.main {
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
</style>
