<script setup lang="ts">
import { ref } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import ScrollableContent from '@/components/Generic/ScrollableContent.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const text = ref(
  "# Drift\nDrift（仮）は **個人用電子ノート兼タスク管理サービス** です。この Web アプリの端的な説明をします。\n\n最も基本的な機能としては、[Microsoft To Do](https://www.microsoft.com/ja-jp/microsoft-365/microsoft-to-do-list-app) に代表される一般的なタスク管理アプリと同様に日常のタスクの「作成 / 削除」や「解決済みにする / 未解決にする」といった状態操作ができます。タスクは「題名 / 概要テキスト / 日時」などの情報からなる情報の単位です。\n\n一般的なタスク管理サービスと異なる点として、Drift（仮）には電子ノート機能が用意されています。作成したタスクごとに白紙のテキストエディタが用意され、WYSIWYG の Markdown + LaTeX でテキストを書き込むことができます。大学の課題などにおいて、タスクに紐付けられたテキストエディタでタスクを遂行することができます。\n\n他にも既存サービスと異なる点がいくつかありますが、それについては後述します。\n\n## 1. 発想\n\nこのアプリは「WYSIWYG の LaTeX + Markdown エディタが欲しい」および「タスク管理アプリの中でタスクをこなしたい」という異なる発想から構想に至りました。\n\n### WYSIWYG の LaTeX + Markdown エディタ\n\n私は普段 VSCode の Markdown All In One で授業ノートを取っていて、レポートの執筆も VSCode 上で TeX ファイルを編集しています。これはこれで良いツールなのですが、普段から以下のような問題を感じていました。\n\n- .md や .tex の中に書く、LaTeX による数式表記の可読性が異常に低い\n\n- プレビューの表示のために画面を2分割する必要があり、ノートパソコンでは横幅が狭すぎる\n\nこのような問題を解決するために LaTeX の数式を含む Markdown テキストを WYSIWYG（プレビュー自体を編集する形式）で編集することができないかと考えていました。Markdown の WYSIWYG エディタにはいくつか種類があり、有名どころでは [MarkText](https://www.marktext.cc/) というオープンソースの無料エディタがなかなか有用です。しかし多くの場合 LaTeX 数式の WYSIWYG 編集までは搭載していないようです。[WolframAlpha](https://www.wolframalpha.com/) とか [GeoGebra](https://www.geogebra.org/calculator) で数式の WYSIWYG 編集を体験することはできますが、いずれも LaTeX とは互換性のない独自の形式です。\n\nLaTeX の数式の WYSIWYG について考えていた折、11月に操山中学校の生徒さんが traP を訪問し、開発中の [MathPad](https://anagomeshi.github.io/mathpad/) という Web アプリを触らせていただけました。慣れれば長い数式もすらすら書ける優れもので、LaTeX を WYSIWYG で書くことについて具体的な構想を練る上で大変な刺激をもらうことができました。\n\n### エディタ + タスク管理アプリ\n\nその役割上、タスク管理アプリは山と積まれたタスクに追われている現実だけを見せつけてくる面白みも魅力もないアプリです。これまでに私は先にあげた Microsoft To Do や [Trello](https://trello.com) といったいくつかのタスク管理アプリを試しましたが、やはりどれも開くこと自体が億劫になってしまって、結局使うのをやめてしまいました。現在は Discord にタスク管理チャンネルを用意して、タスクが生じたらそこに投げるようにしています。Discord は個人的なメモなどにもよく使っていて、開くこと自体がそこまで面倒ではないからです。\n\nあ\n\n## 2. 方法\n\nVue か React かどっちがいいかな〜と考えているところです。プロジェクトにするならば扱える人が多い Vue の方が適していそう。\n\n## 3. そのほかの工夫\n\n> MathPad は [MathQuill](http://mathquill.com/) という LaTeX の WYSIWYG を搭載していて、\n> \n> - Computer Modern フォントによる TeX 本来の書体に比べればやや美しさに欠けること（ノートは美しく書きたいじゃないですか）\n> \n> - 太字 $\bm{a}$ や行列の描画に対応していないこと（対応しているのかもしれないが調べても出し方がよくわからなかった）\n>\n> - どうせゼロから作るなら我々大学生向けにもっと隅々まで工夫をしたい\n\n|    how    | about |  this?   |\n| :-------: | :---: | :------: |\n|     I     | think |   you    |\n| shouldn't |  use  | Japanese |\n|    in     |  the  |  table   |\n\n```ts\nimport { onMounted, ref, watch, nextTick } from 'vue'\nimport { decorated } from '@/lib/editor-parse'\nconst isPreview = defineModel<boolean>('isPreview')\nconst text = defineModel<string>('text')\n\nconst isComposing = ref(false)\nconst textAll = ref('') // 変換中の部分を含めたテキスト全体\nconst cursorPos = ref(0) // カーソル位置\nconst textComposing = ref('')\n```",
)

const isPreview = ref(false)
</script>

<template>
  <mobile-header v-if="xs" title="ユーザー情報" />
  <div :class="$style.container">
    <div style="width: 100%; height: 100%" v-if="!isPreview">
      <div style="width: 100%; height: 100%; position: absolute">
        <MarkdownEditor
          v-model:text="text"
          v-model:isPreview="isPreview"
          style="background-color: var(--color-white)"
        >
          <v-btn
            @click="isPreview = true"
            density="comfortable"
            elevation="0"
            icon="mdi-eye-outline"
            baseColor="transparent"
            class="text-primary"
            style="margin-bottom: 10px"
          ></v-btn>
        </MarkdownEditor>
      </div>
    </div>
    <div style="height: 100%" v-else>
      <ScrollableContent>
        <MarkdownPreview v-model:text="text" v-model:isPreview="isPreview" style="padding: 10px" />
      </ScrollableContent>
      <div :class="$style.button">
        <v-btn
          @click="isPreview = false"
          density="comfortable"
          icon="mdi-square-edit-outline"
          baseColor="white"
          class="text-primary"
        ></v-btn>
      </div>
    </div>
    <!-- <EditPreviewButton :class="$style.button" v-model:isPreview="isPreview" /> -->
  </div>
</template>

<style module>
.container {
  position: relative;
  height: 100%;
}

.button {
  position: absolute;
  top: 10px;
  right: 6px;
}
</style>
