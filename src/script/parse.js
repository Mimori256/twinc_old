//Global variables
var beginSpringA = {"月": "20210412", "火": "20210413", "水": "20210414", "木": "20210408", "金": "20210409"};
var beginSpringB = {"月": "20210524", "火": "20210525", "水": "20210526", "木": "20210520", "金": "20210521"};
var beginSpringC = {"月": "20210705", "火": "20210706", "水": "20210707", "木": "20210701", "金": "20210702"};

//the head element is a dummy 
var classBeginPeriod = ["0", "084000", "101000", "121500", "134500", "151500", "164500"];
var classEndPeriod = ["0", "095500", "112500", "133000", "150000", "163000", "180000"];


function isAvailableModule(module) {
  //Spring term
  if (module.indexOf("春") == -1 && module.indexOf("秋") == -1) {
    return false;
  }

  else {
    return true;
  }
}


function isWeekday(period) {

  let weekdayList = ["月", "火", "水", "木", "金"];

  if (weekdayList.includes(period.slice(0, 1))) {
    return true;
  }

  else {
    return false;
  }
}


function getSpan(module, period) {

  let beginDate = "";
  let beginTime = "";
  let endTime = "";

  let DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  let DTEND = "DTEND;TZID=Asia/Tokyo:";

  //Get the start and end date of the module
  if(module[0] == "春") {

    switch(module[1]) {

      case "A":
        beginDate = beginSpringA[period[0]];
        break;

      case "B":
        beginDate = beginSpringB[period[0]];
        break;

      case "C":
        beginDate = beginSpringC[period[0]];
        break;
      }
  }

  //Todo: Fall term

  //Get the start and end time of the course
  let beginPeriod = classBeginPeriod[parseInt(period.slice(1,2))];
  let endPeriod  = classEndPeriod[parseInt(period.slice(-1))];

  return DTSTART + beginDate + "T" + beginPeriod + "\n" + 
         DTEND + beginDate + "T" + endPeriod + "\n";

  
}


function parseCsv(idList, kdb, output) { 

  idList = idList.map(x => x.replace(/[\"]/g, ""));
  idList = idList.map(x => x.replace(/\r/g, ""));

  let i = 1;
  let j = 0;
  let courseList = [];

  for (let i=1; i<idList.length; i++) {
    courseList.push(kdb[String(idList[i])]);
  }

  for (let i=1; i<courseList.length-1; i++) {

    let module = courseList[i][1];
    let period = courseList[i][2];

    if (isAvailableModule(module) != true || isWeekday(period) != true) {
      continue;
    }

    else {
      output += getSpan(module, period);
    }
  }

  return 0;
}

export default { parseCsv };
