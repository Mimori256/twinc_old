<template>
  <transition appear>
    <div class="top">
      <sidebar class="sidebar-area"></sidebar>
      <div class="content" align="center">
        <router-view />
        <p>TWINSからダウンロードしたCSVファイルを選択してください。</p>

        <label>
          <input
            id="upload"
            type="file"
            accept=".csv"
            multiple
            @change="loadCsv"
          />ファイルの選択
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
import kdb from "../assets/kdb.json";
import parse from "../script/parse.js";

var tmp = "";
var output =
  "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinCal 2.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";
var isUploaded = false;

export default {
  name: "Top",

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
          console.log("finish");
        };
      }
    },

    submit() {
      if (isUploaded === false) {
        alert("ファイルが選択されていません");
      } else {
        let idList = tmp
          .split("\n")
          .filter((x, i, self) => self.indexOf(x) === i);
        output = output + parse.parseCsv(idList, kdb) + "END:VCALENDAR";
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
          "ファイルは選択されていません";
        isUploaded = false;
        location.reload();
      }
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
  align: center;
  background-color: white;
  flex-direction: column;
  min-height: 90vh;
  width: 80%;
  margin: 0 0 0 15%;
}

.warn {
  font-size: 1.1rem;
  color: deeppink;
}

.help_link {
  font-size: 1.3rem;
}

.link {
  color: #5ecfd1;
}

label {
  position: center;
  white-space: nowrap;
  width: 10rem;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1%;
  font-weight: 400;
  color: #000;
  line-height: 2.5rem;
  background-color: #ddd;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-top: 5%;
  margin-left: 40%;
  margin-bottom: 3%;
}

input[type="file"] {
  display: none;
}

#fileName {
  margin-right: 5%;
  color: deeppink;
}

label:hover {
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
  color: #000;
  background-color: #ddd;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-top: 2.5%;
  margin-left: 40%;
  margin-bottom: 2%;
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
    margin: 10% auto;
  }
  .button {
    margin: 10% auto;
  }
  #fileName {
    margin: 0 auto;
  }
}
</style>
