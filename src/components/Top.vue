<template>
  <div class="top">
    <sidebar class="sidebar-area"></sidebar>
    <div class="content" align="center">
      <router-view/>
      <h1>TwinC(ツインシー)</h1>
      <p>TWINSからダウンロードしたCSVファイルを選択してください。</p>
      <input id="upload" type="file" accept=".csv" multiple @change="loadCsv"> 
      <button class="button" v-on:click="submit">Submit</button>
      <div id="result"></div>
    </div>
  </div>
</template>

<script>

import kdb from "../assets/kdb.json"
import parse from "../script/parse.js"

var isUploaded = false
var isMultiple = false;

var output = "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinCal 2.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";

export default {
  name: "Top",
  methods: {

    loadCsv(e) {

      let vm = this;
      vm.workers = [];
      vm.message = "";
      let file = e.target.files[0];

      let reader = new FileReader();
      reader.readAsText(file);
      console.log(reader.result);
      reader.onload = () => {
        let idList = reader.result.split("\n");
        output += parse.parseCsv(idList, kdb);
        isUploaded = true;
      }
    } ,

    submit() {

      if (isUploaded === false) {
        alert("ファイルが選択されていません");
      }

      else {
        output += "END:VCALENDAR";
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

.content{
  display: flex;
  align: center;
  background-color: white;
  flex-direction: column;
  min-height: 100vh; 
  width: 90%;
  margin: 0 0 0 20%;
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
  }

.button:hover {
  background-color: #5ecfd1;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

</style>
