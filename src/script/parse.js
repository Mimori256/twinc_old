"use strict";
exports.__esModule = true;
//Global variables
var beginSpringA = {
  月: "20210412",
  火: "20210413",
  水: "20210414",
  木: "20210408",
  金: "20210409"
};
var beginSpringB = {
  月: "20210524",
  火: "20210525",
  水: "20210526",
  木: "20210520",
  金: "20210521"
};
var beginSpringC = {
  月: "20210705",
  火: "20210706",
  水: "20210707",
  木: "20210701",
  金: "20210702"
};
var beginFallA = {
  月: "20211004",
  火: "20211005",
  水: "20211006",
  木: "20211007",
  金: "20211001"
};
var beginFallB = {
  月: "20211115",
  火: "20211116",
  水: "20211117",
  木: "20211111",
  金: "20211112"
};
var beginFallC = {
  月: "20220124",
  火: "20220111",
  水: "20220112",
  木: "20220106",
  金: "20210107"
};
var springEndDate = {
  A: "20210518T130000Z;",
  B: "20210623T130000Z;",
  C: "20210805T130000Z;"
};
var fallEndDate = {
  A: "20211109T130000Z;",
  B: "20211221T130000Z;",
  C: "20220215T130000Z;"
};
var engWeekday = {
  月: "MO",
  火: "TU",
  水: "WE",
  木: "TH",
  金: "FR"
};
//the head element(0) is a dummy
var classBeginPeriod = [
  "0",
  "084000",
  "101000",
  "121500",
  "134500",
  "151500",
  "164500",
  "182000",
  "194500"
];
var classEndPeriod = [
  "0",
  "095500",
  "112500",
  "133000",
  "150000",
  "163000",
  "180000",
  "210000"
];
var springAHolidays = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507"
];
var springBHolidays = [];
var springCHolidays = ["20210722", "20210723"];
var fallAHolidays = ["20211103", "20211105", "20211108", "20211109"];
var fallBHolidays = ["20211123", "20211125", "20211129", "20211130"];
var fallCHolidays = [
  "20220110",
  "20220113",
  "20220114",
  "20220117",
  "20220118",
  "20220211"
];
var springABCHolidays = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507",
  "20210519",
  "20210722",
  "20210723"
];
var fallABCHolidays = [
  "20211103",
  "20211105",
  "20211108",
  "20211109",
  "20211123",
  "20211125",
  "20211129",
  "20211130",
  "20220110",
  "20220113",
  "20220114",
  "20220117",
  "20220118",
  "20220204"
];
//Date:Module:Class schedule of the day
var rescheduleDate = [
  "20210507",
  "20210722",
  "20211109",
  "20211125",
  "20220113",
  "20220118"
];
var rescheduledClass = [
  "春A:水",
  "春C:金",
  "秋B:水",
  "秋B:火",
  "秋C:金",
  "秋C:月"
];
var addZero = function(str) {
  return str.length === 1 && str != "T" ? "0" + str : str;
};
var isAvailableModule = function(module) {
  return module.indexOf("春") == -1 && module.indexOf("秋") == -1
    ? false
    : true;
};
var isWeekday = function(period) {
  var weekdayList = ["月", "火", "水", "木", "金"];
  return weekdayList.includes(period.slice(0, 1)) ? true : false;
};
var isMultipleTerms = function(module) {
  return module.indexOf("春") != -1 && module.indexOf("秋") != -1
    ? true
    : false;
};
var formedModule = function(module) {
  var removeList = [" 夏季休業中", " 春季休業中"];
  for (var i = 0; i < removeList.length; i++) {
    module = module.replace(removeList[i], "");
  }
  return module;
};
var removeSpecialPeriod = function(period) {
  var removeList = [" 集中", ",集中", " 随時", " 応談"];
  for (var i = 0; i < removeList.length; i++) {
    period = period.replace(removeList[i], "");
  }
  return period;
};
var formedPeriod = function(period) {
  if (period.indexOf("・") != -1 && period.length == 4) {
    period = period.replace("・", ",");
    return (period[0] + period.slice(-1) + period.slice(2, 4)).split(",");
  } else if (period.indexOf("・") != -1 && period.length == 6) {
    return (period[0] + period.slice(3) + period.slice(1)).split("・");
  } else {
    return [period];
  }
};
var getSpan = function(module, period) {
  var beginDate = "";
  var DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  var DTEND = "DTEND;TZID=Asia/Tokyo:";
  //Get the start and end date of the module
  if (module[0] == "春") {
    switch (module[1]) {
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
  } else {
    switch (module[1]) {
      case "A":
        beginDate = beginFallA[period[0]];
        break;
      case "B":
        beginDate = beginFallB[period[0]];
        break;
      case "C":
        beginDate = beginFallC[period[0]];
        break;
    }
  }
  //Get the start and end time of the course
  var beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
  var endPeriod = classEndPeriod[parseInt(period.slice(-1))];
  return (
    DTSTART +
    beginDate +
    "T" +
    beginPeriod +
    "\n" +
    DTEND +
    beginDate +
    "T" +
    endPeriod +
    "\n"
  );
};
var addReschedule = function(index, period) {
  var beginDate = rescheduleDate[index];
  var DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  var DTEND = "DTEND;TZID=Asia/Tokyo:";
  //Get the start and end time of the course
  var beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
  var endPeriod = classEndPeriod[parseInt(period.slice(-1))];
  return (
    DTSTART +
    beginDate +
    "T" +
    beginPeriod +
    "\n" +
    DTEND +
    beginDate +
    "T" +
    endPeriod +
    "\n"
  );
};
var getRepeat = function(module, period) {
  var rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
  var exdate;
  rrule +=
    module[0] == "春"
      ? springEndDate[module.slice(-1)]
      : fallEndDate[module.slice(-1)];
  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeHolidays(module, period);
  return rrule + exdate;
};
//For ABC module classes
var getABCRepeat = function(module, period) {
  var rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
  var exdate;
  rrule += module[0] == "春" ? "20210729T130000Z;" : "20220208T130000Z;";
  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeABCHolidays(module, period);
  return rrule + exdate;
};
var getMisc = function(name, classroom, desc) {
  //Get the current time
  var year = "2021";
  var month = "4";
  var date = "8";
  var hour = "0";
  var minute = "0";
  var timeStampList = [year, month, date, "T", hour, minute, "00"];
  var timeStamp = timeStampList
    .map(function(x) {
      return addZero(x);
    })
    .join("");
  var dtstamp = "DTSTAMP:" + timeStamp;
  var created = "CREATED:" + timeStamp;
  var description = "DESCRIPTION:" + desc;
  var lastModified = "LAST-MODIFIED:" + timeStamp;
  var classroomLocation = "LOCATION:" + classroom;
  var sequence = "SEQUENCE:0";
  var confirmed = "STATUS:CONFIRMED";
  var summary = "SUMMARY:" + name;
  var transp = "TRANSP:OPAQUE";
  return [
    dtstamp,
    created,
    description,
    lastModified,
    classroomLocation,
    sequence,
    confirmed,
    summary,
    transp
  ].join("\n");
};
var removeHolidays = function(module, period) {
  var beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
  var holidaysList = [];
  var exdate = "EXDATE:";
  switch (module) {
    case "春A":
      holidaysList = springAHolidays;
      break;
    case "春B":
      holidaysList = springBHolidays;
      break;
    case "春C":
      holidaysList = springCHolidays;
      break;
    case "秋A":
      holidaysList = fallAHolidays;
      break;
    case "秋B":
      holidaysList = fallBHolidays;
      break;
    case "秋C":
      holidaysList = fallCHolidays;
      break;
  }
  //Check if the list is blank
  if (holidaysList.length === 0) {
    return "";
  }
  for (var i = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }
  return exdate + "\n";
};
//For ABC classes
var removeABCHolidays = function(module, period) {
  var beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
  var holidaysList;
  var exdate = "EXDATE:";
  holidaysList = module[0] == "春" ? springABCHolidays : fallABCHolidays;
  for (var i = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }
  return exdate + "\n";
};
var parseCsv = function(idList, kdb) {
  var output = "";
  idList = idList.map(function(x) {
    return x.replace(/[\"]/g, "");
  });
  idList = idList.map(function(x) {
    return x.replace(/\r/g, "");
  });
  var eventBegin = "BEGIN:VEVENT\n";
  var eventEnd = "\nEND:VEVENT\n";
  var courseList = [];
  //Search courses
  for (var i = 0; i < idList.length - 1; i++) {
    courseList.push(kdb[idList[i]]);
  }
  for (var i = 0; i < courseList.length; i++) {
    var name_1 = courseList[i][0];
    var module = formedModule(courseList[i][1]);
    var period = removeSpecialPeriod(courseList[i][2]);
    var classroom = courseList[i][3];
    var description = courseList[i][4];
    var icsEvent = "";
    if (!isAvailableModule(module) || !isWeekday(period)) {
      continue;
    }
    var devidedModule = "";
    var devidedPeriod = void 0;
    var isABC = false;
    var moduleList = void 0;
    if (isMultipleTerms(module) === true) {
      var devidePositioin = module.indexOf("秋");
      moduleList = (
        module.slice(0, devidePositioin) +
        "," +
        module.slice(devidePositioin)
      ).split(",");
    } else {
      moduleList = [module];
    }
    devidedPeriod =
      period.length > 4 || period.indexOf("・") != -1
        ? formedPeriod(period)
        : [period];
    for (var j = 0; j < moduleList.length; j++) {
      for (var k = 1; k < moduleList[j].length; k++) {
        for (var l = 0; l < devidedPeriod.length; l++) {
          if (moduleList[j].slice(1) === "ABC") {
            devidedModule = moduleList[j][0] + moduleList[j][1];
            icsEvent =
              getSpan(devidedModule, devidedPeriod[l]) +
              getABCRepeat(devidedModule, devidedPeriod[l]) +
              getMisc(name_1, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
            isABC = true;
          } else {
            devidedModule = moduleList[j][0] + moduleList[j][k];
            icsEvent =
              getSpan(devidedModule, devidedPeriod[l]) +
              getRepeat(devidedModule, devidedPeriod[l]) +
              getMisc(name_1, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
            isABC = false;
          }
        }
        if (isABC === true) {
          break;
        }
      }
    }
    //reschedule
    devidedPeriod =
      period.length > 4 || period.indexOf("・") != -1
        ? formedPeriod(period)
        : [period];
    for (var j = 0; j < moduleList.length; j++) {
      for (var k = 1; k < moduleList[j].length; k++) {
        for (var l = 0; l < devidedPeriod.length; l++) {
          devidedModule = module[0] + module[k];
          var rescheduleIndex = rescheduledClass.indexOf(
            devidedModule + ":" + period[0]
          );
          if (rescheduleIndex !== -1) {
            icsEvent =
              addReschedule(rescheduleIndex, devidedPeriod[l]) +
              getMisc(name_1, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
          }
        }
      }
    }
  }
  return output;
};
exports["default"] = { parseCsv: parseCsv };
