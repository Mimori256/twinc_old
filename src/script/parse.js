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

  if (period.slice(0, 1) in weekdayList) {
    return true;
  }

  else {
    return false;
  }
}


function getModuleDate(module) {

  let begin = "";
  let end = "";
}  



function parseCsv(idList, kdb) { 

  idList = idList.map(x => x.replace(/[\"]/g, ""));
  idList = idList.map(x => x.replace(/\r/g, ""));

  let i = 1;
  let j = 0;
  let courseList = [];

  for (let i=1; i<idList.length; i++) {
    courseList.push(kdb[String(idList[i])]);
  }

  for (let i=1; i<courseList.length; i++) {

    if (isAvailableModule(courseList[i][1]) != true || isWeekday(courseList[i][2])) {
      continue;
    }

    else {
      getModuleDate(courseList[i][1]);
    }
  }
  return 0;
}
export default { parseCsv };
