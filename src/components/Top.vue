<template>
  <div class="top">
    <sidebar class="sidebar-area"></sidebar>
    <div class="content" align="center">
      <router-view/>
      <p>TWINSからダウンロードしたCSVファイルを選択してください。</p>
      <input id="upload" type="file" accept=".csv" multiple @change="loadCsv"> 
      <button class="button" v-on:click="submit">ダウンロード</button>
      <span class="notice">
        <p>試験期間、試験日の予定は登録されないことに注意してください</p>
        <p>モジュールの期間は学年暦に基づいています</p>
        <p>祝日に授業は登録されません</p>
        <p>学年暦に表示されている振替には対応していますが、それ以外の振替には対応していません</p>
      </span>
    </div>
  </div>
</template>

<script>

import kdb from "../assets/kdb.json"
import parse from "../script/parse.js"

var isUploaded = false

var tmp = "";
var output = "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinCal 2.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";

export default {
  name: "Top",
  methods: {

    loadCsv(e) {

      let vm = this;
      vm.workers = [];
      vm.message = "";
      let files = e.target.files;

      for (let i=0,f; f=files[i]; i++) {

        let reader = new FileReader();
        reader.readAsText(f);
        reader.onload = () => {
        tmp += reader.result;
        isUploaded = true;
        }
      }
    } ,

    submit() {

      if (isUploaded === false) {
        alert("ファイルが選択されていません");
      }

      else {
        let idList = tmp.split("\n").filter((x, i, self) => self.indexOf(x) === i);
        console.log(idList);
        output = output + parse.parseCsv(idList, kdb) + "END:VCALENDAR";
        var blob = new Blob([ output ], { "type" : "text/plain" });
        var name = "icaltest.ics";

        if (window.navigator.msSaveBlob) { 
          window.navigator.msSaveBlob(new Blob([output], { type: "text/plain" }), name);
        } 
        
        else {
          var a = document.createElement("a");
          a.href = URL.createObjectURL(new Blob([output], { type: "text/plain" }));
          //a.target   = '_blank';
          a.download = name;
          document.body.appendChild(a) //  FireFox specification
          a.click();
          document.body.removeChild(a) //  FireFox specification
        }

      }
    } ,
  }
}
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
  min-height: 100vh; 
  width: 95%;
  margin: 0 0 0 8%;
}



#upload {
  margin-left: 42%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.button {
  position: center;
  width: 140px;
  height: 45px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #ddd;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left: 42%; 
  margin-bottom: 5%;
  }

.button:hover {
  background-color: #5ecfd1;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

</style>
