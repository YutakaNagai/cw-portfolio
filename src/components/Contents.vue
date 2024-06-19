<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const contentsOrigin = [
  {
    title: 'ポケしりとり',
    detail: '一人用のしりとりゲーム',
    comment: '右上のハンバーガーメニューから設定変更可能',
    url: 'https://poke-siritori.pages.dev/',
    repoName: 'poke-siritori',
  },
  {
    title: 'THE OJIGI HANKO',
    detail: 'お辞儀ハンコになるようベストな角度でスタンプするゲーム',
    comment: '同じ苗字があるとスコアボーナス',
    url: 'https://ojigi-hanko-sample.pages.dev/',
    repoName: 'ojigi-hanko-sample',
  },
  {
    title: 'drag10',
    detail: '合計で10になるカードを囲んで消すゲーム',
    comment: 'DBでランキング機能も追加',
    url: 'https://drag10.pages.dev/',
    repoName: 'drag10',
  },
]

const fetchedContents = ref()

const fetchLastUpdates = () => {
  // githubの最終更新日時取得
  const promiseList = []
  for (let i=0; i<contentsOrigin.length; i++){
    const content = contentsOrigin[i]
    promiseList.push(
      axios.get(`https://api.github.com/repos/YutakaNagai/${content.repoName}/commits`)
        .then(res => res.data)
        .then(info => info[0]["commit"])
        .then(commit => {
          content.lastCommitMsg = commit.message
          const date = new Date(commit.committer.date)
          content.lastCommitDate = date.toLocaleString({ timeZone: 'Asia/Tokyo' })
          content.lastCommitTimeUTC = date.getTime()
          return content
        })
    )
  }

  // 更新日の新しい順に並び変え
  Promise.all(promiseList)
    .then((results)=>{
      results.sort((a, b) => {
        return b.lastCommitTimeUTC - a.lastCommitTimeUTC
      })
      fetchedContents.value = results
    })
}

onMounted(async ()  => {
  await fetchLastUpdates()
})

</script>

<template>
  <div>↓最終更新日時順↓</div>
  <div v-for="(content, index) in fetchedContents" :key="index" class="contents">
    <table>
      <tr>
        <th>タイトル</th><td><a :href="content.url" target="_blank">{{ content.title }}</a></td>
      </tr>
      <tr>
        <th>詳細</th><td>{{ content.detail }}</td>
      </tr>
      <tr>
        <th>コメント</th><td>{{ content.comment }}</td>
      </tr>
      <tr>
        <th>最終更新日</th><td>{{ content.lastCommitDate }}</td>
      </tr>
      <tr>
        <th>最終更新内容</th><td>{{ content.lastCommitMsg }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.contents {
  background: #C4E1C5;
  border-radius: 10svw;
  width: 80svw;
  margin: 5svw 0;
  box-shadow: 0.35rem 0.4rem 0.35rem 0rem rgba(0, 0, 0, 0.35);
}

table {
  padding: 1rem;
}
tr {
  padding: 1rem;
}
th {
  font-weight: bold;
  text-align: center;
  width: 6rem;
}
td {
  text-align: left;
}
</style>
