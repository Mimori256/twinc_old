<template>
  <transition appear>
    <div class="top">
      <sidebar class="sidebar-area"></sidebar>
      <div class="content" align="center">
        <router-view />
        <p>
          TWINS,またはkdbもどきからダウンロードしたCSVファイルを選択してください。
        </p>

        <label id="fileUpload">
          <input
            id="upload"
            type="file"
            accept=".csv"
            multiple
            @change="loadCsv"
          />ファイルの選択
        </label>

        <label for="containDeadlines">
          事前登録・履修登録締切日もカレンダーに登録する
          <input
            type="checkbox"
            id="containDeadlines"
            v-model="containDeadlines"
          />
        </label>

        <span id="fileName"
          >ファイルは選択されていません<!--The name of the file uploaded--></span
        >

        <button class="button" v-on:click="submit">ダウンロード</button>

        <span class="notice">
          <span class="warn"
            ><p>
              生成したicsファイルは新しく作ったカレンダーにインポートしてください！
            </p></span
          >
          <p>試験期間、試験日の予定は登録されないことに注意してください</p>
          <p>モジュールの期間は学年暦に基づいています</p>
          <p>祝日に授業は登録されません</p>
          <p>通年授業は現在登録に対応していません</p>
          <p>
            学年暦に表示されている振替には対応していますが、それ以外の振替には対応していません
          </p>
        </span>

        <span class="help_link">
          <p>
            詳しい使い方は<router-link to="/Help" class="link">Help</router-link
            >を参照してください
          </p>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import kdb from "../assets/kdb_twinc.json";
import parse from "../script/parse.js";

let tmp = "";
let isUploaded = false;
let isKdbAlt = false;

export default {
  name: "Top",

  data: {
    containDeadlines: false
  },

  methods: {
    loadCsv(e) {
      let vm = this;
      vm.workers = [];
      vm.message = "";
      let files = e.target.files;
      let fileNameList = [];

      for (let i = 0, f; (f = files[i]); i++) {
        let reader = new FileReader();
        fileNameList.push(f.name);
        reader.readAsText(f);
        reader.onload = () => {
          tmp += reader.result;
          isUploaded = true;
          document.getElementById("fileName").innerHTML =
            fileNameList.join(" , ") + "が選択されています";
          if (tmp.slice(0, 1) === "科") {
            isKdbAlt = true;
          }
          console.log("finish");
        };
      }
    },

    submit() {
      const ischecked = this.containDeadlines;
      let idList;
      if (!isUploaded) {
        alert("ファイルが選択されていません");
      } else if (isKdbAlt) {
        let tmpList = tmp.split("\n").filter(x => x.slice(0, 1) === '"');
        tmpList = tmpList
          .map(x => x.replace('"', ""))
          .filter((x, i, self) => self.indexOf(x) === i);
        idList = tmpList;
      } else {
        idList = tmp.split("\n").filter((x, i, self) => self.indexOf(x) === i);
      }
      let [output, isValid] = parse.parseCsv(idList, kdb, ischecked);
      output += "END:VCALENDAR";

      if (!isValid) {
        alert("カレンダーに登録できる授業が存在しません");
        return 0;
      }
      let blob = new Blob([output], { type: "text/plain" });
      let now = new Date();
      let hour = ("0" + now.getHours()).slice(-2);
      let minute = ("0" + now.getMinutes()).slice(-2);
      let second = ("0" + now.getSeconds()).slice(-2);
      let name = `${hour}-${minute}-${second}${"twinc.ics"}`;

      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(
          new Blob([output], { type: "text/plain" }),
          name
        );
      } else {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(
          new Blob([output], { type: "text/plain" })
        );
        //a.target   = '_blank';
        a.download = name;
        document.body.appendChild(a); //  FireFox specification
        a.click();
        document.body.removeChild(a); //  FireFox specification
      }

      //Clear selected file
      let fileObject = document.getElementById("upload");
      fileObject.value = "";
      document.getElementById("fileName").innerHTML =
        "ファイルが選択されていません";
      isUploaded = false;
      idList = "";
      location.reload();
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
  background-color: #5ecfd1;
}

.sidebar-area {
  float: left;
}

.content {
  color: gray;
  display: flex;
  align-content: center;
  background-color: white;
  height: 100vh;
  width: 80%;
  margin: 0% 0% 0% 15%;
  overflow: scroll;
}

.warn {
  font-size: 1.1rem;
  color: deeppink;
}

.help_link {
  font-size: 1.2rem;
}

.link {
  color: #5ecfd1;
}

label,
input[type="checkbox"] {
  cursor: pointer;
  margin-bottom: 1rem;
  color: #333;
}

#fileUpload {
  position: center;
  white-space: nowrap;
  width: 10rem;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1%;
  font-weight: 400;
  color: #333;
  line-height: 2.5rem;
  background-color: #ddd;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-top: 1.5%;
  margin-left: 41.5%;
  margin-bottom: 2.5%;
}

input[type="file"] {
  display: none;
}

#fileName {
  color: deeppink;
  margin-right: 5%;
  white-space: nowrap;
}

#fileUpload:hover {
  background-color: #5ecfd1;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.button {
  position: center;
  white-space: nowrap;
  width: 10rem;
  height: 2.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.1%;
  line-height: 2.5rem;
  font-weight: 500;
  color: #333;
  background-color: #ddd;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-top: 1.5%;
  margin-left: 41.5%;
  margin-bottom: 1%;
}

.button:hover {
  background-color: #5ecfd1;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
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
@media screen and (max-width: 1100px) {
  .content {
    margin-left: 15%;
    overflow: scroll;
  }
  label {
    margin: 5% auto;
  }
  .button {
    width: 8rem;
    margin-top: 5%;
    margin-left: 32%;
  }

  #fileUpload {
    margin: 5% 28%;
  }

  #fileName {
    margin: 0 10%;
  }
}
</style>
