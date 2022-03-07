<template>
  <transition appear>
    <div class="help">
      <div class="content" align="center">
        <span class="intruction" align="center">
          <p>以下、パソコンでの使用を想定しています</p>
          <p>TWINSからカレンダーを作る場合</p>
          <p>
            <a
              href="https://twins.tsukuba.ac.jp/campusweb/campussmart.do"
              target="_blank"
              rel="nooperner"
              >TWINS</a
            >
            にログインして、履修→カレンダーにしたいモジュールの下のダウンロードボタンから、CSVファイルを出力してください。
          </p>
          <img src="@/assets/img/twinc1.png" width="80%" />
          <p>(ちなみに、このファイルはTwin:teの授業登録にも使えます)</p>
          <p>KdBもどきからカレンダーを作る場合</p>
          <p>
            1．<a href="https://make-it-tsukuba.github.io/alternative-tsukuba-kdb/" target="_blank" rel="nooperner">KdBもどき</a>にPCでアクセスする</br>
             2．仮の履修時間割を組む</br>
            3．検索条件をクリアし、「お気に入り」にチェックを入れて検索する</br>
            4．画面最下部の「CSVダウンロード」をクリックする
          </p>
          <p>
            次に、そのファイルをTwinCのトップページで選択してから、ダウンロードボタンを押して、ファイルをダウンロードしてください。
          </p>
          <img src="@/assets/img/download.png" width="80%" />
          <p>
            ファイル名は(ダウンロード時刻) + twinc.icsとなっています
          </p>
          <p>
            ここではGoogleカレンダーを例にします。Macのカレンダーなどに追加したい場合は自分で調べてください。
          </p>
          <p>
            <a
              href="https://calendar.google.com/"
              target="_blank"
              rel="noopener"
              >Googleカレンダーのトップページ</a
            >の右上から、設定を開いてください。
          </p>
          <img src="@/assets/img/twinc2.png" width="80%" />
          <p>
            そして、カレンダーを追加→新しいカレンダーを作成を選択して、カレンダーに名前をつけて、カレンダーを作成してください。(2回目以降は新しく作る必要はありません)
          </p>
          <img src="@/assets/img/twinc3.png" width="80%" />
          <p>
            カレンダーが生成されるまで待ってから、インポート/エクスポート→インポートから、カレンダーに追加で、<span
              id="warn"
              ><u>自分が作成したカレンダーを選択してから</u></span
            >パソコンからファイルを選択をクリックして、ダウンロードしたファイルを選択、インポートをクリックしてください
          </p>
          <img src="@/assets/img/twinc4.png" width="80%" />
          <p>
            間違えて、他の予定が入っているカレンダーに追加してしまうと、後で削除したいときに削除するのが面倒になってしまうので、注意してください
          </p>
          <p>
            これで完成です!
            他のモジュールも追加したい場合も、同様の手順でファイルを最初に作ったカレンダーにインポートしてください
          </p>
          <img src="@/assets/img/twinc5.png" width="80%" />
          <h2>注意</h2>
          <p>各モジュールの試験期間と試験日には、授業予定が登録されません</p>
          <p>
            モジュールの期間は、<a
              href="https://www.tsukuba.ac.jp/campuslife/calendar-school/pdf/2021-grad-tsukuba.pdf"
              target="_blank"
              rel="noopener"
              >学年暦</a
            >に基づいています
          </p>
          <p>祝日や学年暦に書かれている休日も、授業予定が登録されません</p>
          <p>今年度開講されない授業については登録することができません</p>
          <p>通年授業の登録には対応していません</p>
          <p>
            また、学年暦に書かれている振替に対応して、授業予定は登録されています
          </p>
          <p>
            臨時の休講や振替には対応していないため、自分で確認して逐次対応してください
          </p>
          <p>
            集中、応談、土日、夏季休暇といった特別な日程には対応していません
          </p>
          <span id="warn"
            ><p>テストはしていますが、100%の正確性は保証できません</p></span
          >
          <span id="warn"
            ><p>このアプリが原因で遅刻しても責任は負いかねます</p></span
          >
        </span>
        <span id="blank"></span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.sidebar-area {
  float: left;
}

.content {
  color: gray;
  font-size: 1.2rem;
  display: flex;
  align-content: center;
  background-color: white;
  flex-direction: column;
  height: 90%;
  width: 85%;
  margin: 0 0 0 13%;
  overflow-x: hidden;
  overflow-y: scroll;
}

p {
  margin: 3%;
}

a {
  color: #3fa5a7;
}

#warn {
  color: deeppink;
}

.v-enter {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 500ms;
}

#span {
  padding-top: 0px;
}

@media screen and (max-width: 1100px) {
  .content {
    font-size: 1rem;
    height: 80vh;
    overflow-y: visible;
    margin-top: auto;
    margin-bottom: 0;
    margin-left: 13%;
  }

  #blank {
    margin-top: 50%;
  }
}
</style>
