<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const tab = ref("services");

const contentsOrigin = [
  {
    title: "ポケしりとり",
    detail: "一人用のしりとりゲーム",
    comment: "右上のハンバーガーメニューから設定変更可能",
    url: "https://poke-siritori.pages.dev/",
    repoName: "poke-siritori",
  },
  {
    title: "THE OJIGI HANKO",
    detail: "お辞儀ハンコになるようベストな角度でスタンプするゲーム",
    comment: "同じ苗字があるとスコアボーナス",
    url: "https://ojigi-hanko-sample.pages.dev/",
    repoName: "ojigi-hanko-sample",
  },
  {
    title: "drag10",
    detail: "合計で10になるカードを囲んで消すゲーム",
    comment: "DBでランキング機能も追加",
    url: "https://drag10.pages.dev/",
    repoName: "drag10",
  },
];

const fetchedContents = ref();

const fetchLastUpdates = () => {
  const promiseList = contentsOrigin.map((content) =>
    axios
      .get(
        `https://api.github.com/repos/YutakaNagai/${content.repoName}/commits`
      )
      .then((res) => res.data)
      .then((info) => info[0]["commit"])
      .then((commit) => {
        content.lastCommitMsg = commit.message;
        const date = new Date(commit.committer.date);
        content.lastCommitDate = date.toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        });
        content.lastCommitTimeUTC = date.getTime();
        return content;
      })
  );

  Promise.all(promiseList).then((results) => {
    results.sort((a, b) => b.lastCommitTimeUTC - a.lastCommitTimeUTC);
    fetchedContents.value = results;
  });
};

onMounted(() => {
  fetchLastUpdates();
});
</script>

<template>
  <div class="content-wrapper">
    <div class="tab-bar">
      <button @click="tab = 'services'" :class="{ active: tab === 'services' }">
        Webサービス
      </button>
      <button @click="tab = 'games'" :class="{ active: tab === 'games' }">
        ミニゲーム集
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="tab" class="tab-content">
        <div v-if="tab === 'services'" class="card">
          <img
            src="../assets/yoriguru.png"
            alt="よりみちグルメ"
            class="thumb ogp"
          />
          <h2>よりみちグルメ</h2>
          <p>
            Vue 3とGoogle Maps
            APIを使った、レコメンド型飲食店検索サービス。UXとAPIコスト最適化にこだわって開発しました。
          </p>
          <a class="btn" href="https://yoriguru.com/" target="_blank">
            ▶ サイトを見る
          </a>
        </div>

        <div v-else>
          <div
            v-for="item in fetchedContents"
            :key="item.repoName"
            class="card"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.detail }}</p>
            <p class="comment">{{ item.comment }}</p>
            <p class="update">最終更新: {{ item.lastCommitDate }}</p>
            <a :href="item.url" target="_blank">▶ サイトを見る</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 1rem;
}

.tab-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-bar button {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: relative;
  color: #888;
  transition: color 0.3s;
}

.tab-bar button.active {
  color: #646cff;
  font-weight: bold;
}

.tab-bar button.active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background-color: #646cff;
  border-radius: 1px;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  text-align: left;
  animation: fadeIn 0.4s ease-out;
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #111;
}

.card p {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #444;
}

.card .update {
  font-size: 0.85rem;
  color: #888;
}

.card .thumb {
  width: 100%;
  aspect-ratio: 1200 / 630;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.card a {
  font-weight: bold;
  color: white;
  background-color: #646cff;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.card a:hover {
  background-color: #535bf2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .card {
    padding: 1rem;
  }
  .card h2 {
    font-size: 1.2rem;
  }
  .card p {
    font-size: 0.9rem;
  }
  .card .thumb {
    aspect-ratio: auto;
    height: auto;
    max-height: 200px;
  }
}
</style>
