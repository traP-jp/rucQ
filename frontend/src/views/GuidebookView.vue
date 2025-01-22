<template>
  <header class="guidebook-header">Guidebook</header>

  <div class="guidebook-markdown" v-html="htmlContent"></div>

  <footer class="guidebook-footer">
    <p>© 2024 Summer Camp</p>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const markdown = ref(`
# 2024年度 夏合宿

## 概要
9/10(火)-9/12(木)
山中湖の[三盛荘](http://mitsumoriso.jp/)


## 諸注意
- 初日は**8:45**西9号館前集合です。バスに乗り遅れた場合は自力で来てください。
- **タオル、浴衣などのアメニティはありません。** 各自持ってきてください。
  - タオルを干すためのハンガーもあると良いです。
  - シャンプー等とドライヤーはあります。
- 宿にはWi-Fiがありますが、快適に利用できるかはわかりません。
- 山中湖周辺は東京よりも5°Cほど気温が低いです。
  - 特に氷穴、風穴(青木ヶ原樹海コース)は長袖でも寒いほどの低温で知られています。
  - カチカチ山も標高が高く、寒くなるかもしれません。
- 合宿参加者は全員旅行保険に加入しています。何かあれば**すぐに合宿係に報告**してください。
  - ケガ、賠償、荷物の盗難や破損に対応しています。
  - 連絡は[#event/gasshuku/staff](https://q.trap.jp/channels/event/gasshuku/staff)までお願いします。
  - 合宿係は [@ogu_kazemiya](https://q.trap.jp/channels/gps/times/ogu_kazemiya) [@vPhos]() [@Nek0yanag1]() です。

## traQチャンネル

### [**#event/gasshuku/24_summer**](https://q.trap.jp/channels/event/gasshuku/24_summer)
運営が合宿についての連絡をするチャンネルです。
合宿参加者全員に通知が飛ぶので、**誤爆には注意してください！**

### [#event/gasshuku/staff](https://q.trap.jp/channels/event/gasshuku/staff)
合宿係への連絡、質問等を受け付けているチャンネルです。
ケガ、荷物破損、賠償等の保険が必要になった際もここに連絡してください。

### [#event/gasshuku/24_summer/photo](https://q.trap.jp/channels/event/gasshuku/24_summer/photo)
合宿中の写真をあげるチャンネルです！
[共有アルバム](https://photos.app.goo.gl/p5kRHLBs9WnPBKh88)も用意しています。

### [#event/gasshuku/24_summer/random](https://q.trap.jp/channels/event/gasshuku/24_summer/random)
合宿についての雑談やカジュアルな募集など、なんでも話せる場です。
学年や班の垣根を超えて仲良くなりましょう！！`)

const htmlContent = computed(() => marked(markdown.value))
</script>

<style>
.guidebook-header {
  /* ヘッダー  あとでちゃんとしたのに変更する　仮*/
  background-color: #2c5282;
  color: #f7fafc;
  padding: 20px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  height: 60px;
  font-size: 24px;
  z-index: 100;
}

.guidebook-markdown {
  padding: 30px;
  background-color: #f7fafc; /* 背景色  あとで色はちゃんと設定する*/
  max-width: 1000px;
  height: 100%;
  width: 100%;
  color: #101620;
  line-height: 1.8;
  margin: 0 auto; /* 中央揃え */
  padding: 70px 30px 70px 30px; /* 下にフッターの余白を追加 */
}

.guidebook-markdown h1 {
  color: var(--color-secondary);
  margin-bottom: 24px;
  border-bottom: 1px solid #f7ae5a;
  padding-bottom: 8px;
}

.guidebook-markdown h2 {
  color: #092c57;
  border-bottom: 1px solid #f7ae5a;
  margin-top: 24px;
  margin-bottom: 16px;
}
.guidebook-markdown h3 {
  color: #092c57;
  line-height: 1;
  font-size: 1.2rem;
  margin-top: 24px;
  margin-bottom: 14px;
}

.guidebook-markdown a {
  color: #164fed;
  margin: 2px;
  overflow-wrap: break-word;
  padding: 0;
  line-height: 0.1px;
}

.guidebook-markdown a:hover {
  color: #0842e2;
}

.guidebook-footer {
  /* フッター あとでちゃんとしたのにする*/
  background-color: #2c5282;
  color: #f7fafc;
  text-align: center;
  padding: 10px;
  font-size: 0.9rem;
  bottom: 0;
  position: fixed;
  width: 100%;
}

.guidebook-markdown strong {
  background-color: none;
  /* 文字を太字にする */
  font-weight: bold;
  padding: 2px;
}
</style>
