//Global variables
const beginSpringA = {
  月: "20210412",
  火: "20210413",
  水: "20210414",
  木: "20210408",
  金: "20210409"
};
const beginSpringB = {
  月: "20210524",
  火: "20210525",
  水: "20210526",
  木: "20210520",
  金: "20210521"
};
const beginSpringC = {
  月: "20210705",
  火: "20210706",
  水: "20210707",
  木: "20210701",
  金: "20210702"
};
const beginFallA = {
  月: "20211004",
  火: "20211005",
  水: "20211006",
  木: "20211007",
  金: "20211001"
};
const beginFallB = {
  月: "20211115",
  火: "20211116",
  水: "20211117",
  木: "20211111",
  金: "20211112"
};
const beginFallC = {
  月: "20220124",
  火: "20220111",
  水: "20220112",
  木: "20220106",
  金: "20210107"
};

const springEndDate = {
  A: "20210518T130000Z;",
  B: "20210623T130000Z;",
  C: "20210805T130000Z;"
};
const fallEndDate = {
  A: "20211109T130000Z;",
  B: "20211221T130000Z;",
  C: "20220215T130000Z;"
};

const engWeekday = { 月: "MO", 火: "TU", 水: "WE", 木: "TH", 金: "FR" };

//the head element(0) is a dummy
const classBeginPeriod = [
  "0",
  "084000",
  "101000",
  "121500",
  "134500",
  "151500",
  "164500"
];
const classEndPeriod = [
  "0",
  "095500",
  "112500",
  "133000",
  "150000",
  "163000",
  "180000"
];

const springAHolidays = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507"
];
const springBHolidays = [];
const springCHolidays = ["20210722", "20210723"];
const fallAHolidays = ["20211103", "20211105", "20211108", "20211109"];
const fallBHolidays = ["20211123", "20211125", "20211129", "20211130"];
const fallCHolidays = [
  "20220110",
  "20220113",
  "20220114",
  "20220117",
  "20220118",
  "20220211"
];

const springABCHolidays = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507",
  "20210519",
  "20210722",
  "20210723"
];
const fallABCHolidays = [
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
const rescheduleDate = [
  "20210507",
  "20210722",
  "20211109",
  "20211125",
  "20220113",
  "20220118"
];

const rescheduledClass = [
  "春A:水",
  "春C:金",
  "秋B:水",
  "秋B:火",
  "秋C:金",
  "秋C:月"
];

function addZero(str) {
  if (str.length === 1 && str != "T") {
    return "0" + str;
  }

  return str;
}

function isAvailableModule(module) {
  if (module.indexOf("春") == -1 && module.indexOf("秋") == -1) {
    return false;
  } else {
    return true;
  }
}

function isWeekday(period) {
  const weekdayList = ["月", "火", "水", "木", "金"];

  if (weekdayList.includes(period.slice(0, 1))) {
    return true;
  } else {
    return false;
  }
}

function formedPeriod(period) {
  if (period.indexOf("・") != -1 && period.length == 4) {
    period = period.replace("・", ",");
    return period[0] + period.slice(-1) + period.slice(2, 4);
  } else {
    return period;
  }
}

function getSpan(module, period) {
  let beginDate = "";
  const DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND = "DTEND;TZID=Asia/Tokyo:";

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
  let beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
  let endPeriod = classEndPeriod[parseInt(period.slice(-1))];

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
}

function addReschedule(index, period) {
  let beginDate = rescheduleDate[index];
  const DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND = "DTEND;TZID=Asia/Tokyo:";

  //Get the start and end time of the course
  let beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
  let endPeriod = classEndPeriod[parseInt(period.slice(-1))];

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
}

function getRepeat(module, period) {
  let rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate;
  if (module[0] == "春") {
    rrule += springEndDate[module.slice(-1)];
  }

  //Fall
  else {
    rrule += fallEndDate[module.slice(-1)];
  }

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeHolidays(module, period);
  return rrule + exdate;
}

function getABCRepeat(module, period) {
  let rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate;

  if (module[0] == "春") {
    rrule += "20210729T130000Z;";
  }

  //Fall
  else {
    rrule += "20220208T130000Z;";
  }

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeABCHolidays(module, period);
  return rrule + exdate;
}

function getMisc(name, classroom, desc) {
  //Get the current time
  const year = 2021;
  const month = 4;
  const date = 8;
  const hour = 0;
  const minute = 0;

  const timeStampList = [year, month, date, "T", hour, minute, "00"];
  const timeStamp = timeStampList.map(x => addZero(String(x))).join("");

  const dtstamp = "DTSTAMP:" + timeStamp;
  const created = "CREATED:" + timeStamp;
  const description = "DESCRIPTION:" + desc;
  const lastModified = "LAST-MODIFIED:" + timeStamp;
  const classroomLocation = "LOCATION:" + classroom;
  const sequence = "SEQUENCE:0";
  const confirmed = "STATUS:CONFIRMED";
  const summary = "SUMMARY:" + name;
  const transp = "TRANSP:OPAQUE";

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
}

function removeHolidays(module, period) {
  let beginPeriod = classBeginPeriod[period.slice(1, 2)];
  let holidaysList;
  let exdate = "EXDATE:";

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
  if (holidaysList.length == 0) {
    return "";
  }

  for (let i = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }

  return exdate + "\n";
}

function removeABCHolidays(module, period) {
  let beginPeriod = classBeginPeriod[period.slice(1, 2)];
  let holidaysList;
  let exdate = "EXDATE:";

  if (module[0] == "春") {
    holidaysList = springABCHolidays;
  } else {
    holidaysList = fallABCHolidays;
  }

  for (let i = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }

  return exdate + "\n";
}

function parseCsv(idList, kdb) {
  let output = "";

  idList = idList.map(x => x.replace(/[\"]/g, ""));
  idList = idList.map(x => x.replace(/\r/g, ""));

  const eventBegin = "BEGIN:VEVENT\n";
  const eventEnd = "\nEND:VEVENT\n";
  let courseList = [];

  //Search  a course
  for (let i = 0; i < idList.length - 1; i++) {
    courseList.push(kdb[idList[i]]);
  }

  for (let i = 0; i < courseList.length; i++) {
    const name = courseList[i][0];
    const module = courseList[i][1];
    const period = courseList[i][2].replace(",集中", "");
    const classroom = courseList[i][3];
    const description = courseList[i][4];

    let icsEvent = "";

    if (isAvailableModule(module) != true || isWeekday(period) != true) {
      continue;
    } else {
      let devidedModule = ""; //string
      let devidedPeriod; //list
      let isABC;

      if (period.length > 4 || period.indexOf("・") != -1) {
        devidedPeriod = formedPeriod(period).split(",");
      } else {
        devidedPeriod = [period];
      }

      console.log(devidedPeriod);

      for (let j = 1; j < module.length; j++) {
        for (let l = 0; l < devidedPeriod.length; l++) {
          if (module.slice(1) == "ABC") {
            devidedModule = module[0] + module[1];
            icsEvent =
              getSpan(devidedModule, devidedPeriod[l]) +
              getABCRepeat(devidedModule, devidedPeriod[l]) +
              getMisc(name, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
            isABC = true;
          } else {
            devidedModule = module[0] + module[j];
            icsEvent =
              getSpan(devidedModule, devidedPeriod[l]) +
              getRepeat(devidedModule, devidedPeriod[l]) +
              getMisc(name, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
            isABC = false;
          }
        }

        if (isABC === true) {
          break;
        }
      }

      //reschedule
      if (period.length > 4 || period.indexOf("・") != -1) {
        devidedPeriod = formedPeriod(period).split(",");
      } else {
        devidedPeriod = [period];
      }

      for (let j = 1; j < module.length; j++) {
        for (let l = 0; l < devidedPeriod.length; l++) {
          devidedModule = module[0] + module[j];
          let rescheduleIndex = rescheduledClass.indexOf(
            devidedModule + ":" + period[0]
          );
          if (rescheduleIndex != -1) {
            icsEvent =
              addReschedule(rescheduleIndex, devidedPeriod[l]) +
              getMisc(name, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
          }
        }
      }
    }
  }
  return output;
}

export default { parseCsv };
