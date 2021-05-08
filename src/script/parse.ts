//Global variables
const beginSpringA: { [key: string]: string } = {
  月: "20210412",
  火: "20210413",
  水: "20210414",
  木: "20210408",
  金: "20210409"
};
const beginSpringB: { [key: string]: string } = {
  月: "20210524",
  火: "20210525",
  水: "20210526",
  木: "20210520",
  金: "20210521"
};
const beginSpringC: { [key: string]: string } = {
  月: "20210705",
  火: "20210706",
  水: "20210707",
  木: "20210701",
  金: "20210702"
};
const beginFallA: { [key: string]: string } = {
  月: "20211004",
  火: "20211005",
  水: "20211006",
  木: "20211007",
  金: "20211001"
};
const beginFallB: { [key: string]: string } = {
  月: "20211115",
  火: "20211116",
  水: "20211117",
  木: "20211111",
  金: "20211112"
};
const beginFallC: { [key: string]: string } = {
  月: "20220124",
  火: "20220111",
  水: "20220112",
  木: "20220106",
  金: "20210107"
};

const springEndDate: { [key: string]: string } = {
  A: "20210518T130000Z;",
  B: "20210623T130000Z;",
  C: "20210805T130000Z;"
};
const fallEndDate: { [key: string]: string } = {
  A: "20211109T130000Z;",
  B: "20211221T130000Z;",
  C: "20220215T130000Z;"
};

const engWeekday: { [key: string]: string } = {
  月: "MO",
  火: "TU",
  水: "WE",
  木: "TH",
  金: "FR"
};

//the head element(0) is a dummy
const classBeginPeriod: string[] = [
  "0",
  "084000",
  "101000",
  "121500",
  "134500",
  "151500",
  "164500"
];
const classEndPeriod: string[] = [
  "0",
  "095500",
  "112500",
  "133000",
  "150000",
  "163000",
  "180000"
];

const springAHolidays: string[] = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507"
];
const springBHolidays: string[] = [];
const springCHolidays: string[] = ["202]0722", "20210723"];
const fallAHolidays: string[] = [
  "202]1103",
  "20211105",
  "20211108",
  "20211109"
];
const fallBHolidays: string[] = [
  "202]1123",
  "20211125",
  "20211129",
  "20211130"
];
const fallCHolidays: string[] = [
  "20220110",
  "20220113",
  "20220114",
  "20220117",
  "20220118",
  "20220211"
];

const springABCHolidays: string[] = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507",
  "20210519",
  "20210722",
  "20210723"
];
const fallABCHolidays: string[] = [
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
const rescheduleDate: string[] = [
  "20210507",
  "20210722",
  "20211109",
  "20211125",
  "20220113",
  "20220118"
];

const rescheduledClass: string[] = [
  "春A:水",
  "春C:金",
  "秋B:水",
  "秋B:火",
  "秋C:金",
  "秋C:月"
];

const addZero = (str: string): string => {
  return str.length === 1 && str != "T" ? "0" + str : str;
};

const isAvailableModule = (module: string): boolean => {
  return module.indexOf("春") == -1 && module.indexOf("秋") == -1
    ? false
    : true;
};

const isWeekday = (period: string): boolean => {
  const weekdayList: string[] = ["月", "火", "水", "木", "金"];
  return weekdayList.includes(period.slice(0, 1)) ? true : false;
};

const formedModule = (module: string): string => {
  const removeList: string[] = [",集中", "夏季休業中", "春季休業中"];

  for (let i: number = 0; i < removeList.length; i++) {
    module = module.replace(removeList[i], "");
  }

  return module;
};

const formedPeriod = (period: string): string[] => {
  if (period.indexOf("・") != -1 && period.length == 4) {
    period = period.replace("・", ",");
    return (period[0] + period.slice(-1) + period.slice(2, 4)).split(",");
  } else if (period.indexOf("・") != -1 && period.length == 6) {
    return (period[0] + period.slice(3) + period.slice(1)).split("・");
  } else {
    return [period];
  }
};

const getSpan = (module: string, period: string): string => {
  let beginDate: string = "";
  const DTSTART: string = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND: string = "DTEND;TZID=Asia/Tokyo:";

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
  let beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let endPeriod: string = classEndPeriod[parseInt(period.slice(-1))];

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

const addReschedule = (index: number, period: string): string => {
  let beginDate: string = rescheduleDate[index];
  const DTSTART: string = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND: string = "DTEND;TZID=Asia/Tokyo:";

  //Get the start and end time of the course
  let beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let endPeriod: string = classEndPeriod[parseInt(period.slice(-1))];

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

const getRepeat = (module: string, period: string): string => {
  let rrule: string = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate: string;

  rrule +=
    module[0] == "春"
      ? springEndDate[module.slice(-1)]
      : fallEndDate[module.slice(-1)];

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeHolidays(module, period);
  return rrule + exdate;
};

//For ABC module classes
const getABCRepeat = (module: string, period: string): string => {
  let rrule: string = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate: string;

  rrule += module[0] == "春" ? "20210729T130000Z;" : "20220208T130000Z;";

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeABCHolidays(module, period);
  return rrule + exdate;
};

const getMisc = (name: string, classroom: string, desc: string): string => {
  //Get the current time
  const year: string = "2021";
  const month: string = "4";
  const date: string = "8";
  const hour: string = "0";
  const minute: string = "0";

  const timeStampList: string[] = [year, month, date, "T", hour, minute, "00"];
  const timeStamp: string = timeStampList.map(x => addZero(x)).join("");

  const dtstamp: string = "DTSTAMP:" + timeStamp;
  const created: string = "CREATED:" + timeStamp;
  const description: string = "DESCRIPTION:" + desc;
  const lastModified: string = "LAST-MODIFIED:" + timeStamp;
  const classroomLocation: string = "LOCATION:" + classroom;
  const sequence: string = "SEQUENCE:0";
  const confirmed: string = "STATUS:CONFIRMED";
  const summary: string = "SUMMARY:" + name;
  const transp: string = "TRANSP:OPAQUE";

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

const removeHolidays = (module: string, period: string): string => {
  let beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let holidaysList: string[] = [];
  let exdate: string = "EXDATE:";

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

  for (let i: number = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }

  return exdate + "\n";
};

//For ABC classes
const removeABCHolidays = (module: string, period: string): string => {
  let beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let holidaysList: string[];
  let exdate: string = "EXDATE:";

  holidaysList = module[0] == "春" ? springABCHolidays : fallABCHolidays;

  for (let i: number = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }

  return exdate + "\n";
};

const parseCsv = (idList: string[], kdb: { [key: string]: string }): string => {
  let output: string = "";

  idList = idList.map(x => x.replace(/[\"]/g, ""));
  idList = idList.map(x => x.replace(/\r/g, ""));

  const eventBegin: string = "BEGIN:VEVENT\n";
  const eventEnd: string = "\nEND:VEVENT\n";
  let courseList: string[] = [];

  //Search courses
  for (let i: number = 0; i < idList.length - 1; i++) {
    courseList.push(kdb[idList[i]]);
  }

  for (let i: number = 0; i < courseList.length; i++) {
    const name: string = courseList[i][0];
    const module: string = courseList[i][1];
    const period: string = formedModule(courseList[i][2]);
    const classroom: string = courseList[i][3];
    const description: string = courseList[i][4];

    let icsEvent: string = "";

    if (!isAvailableModule(module) || !isWeekday(period)) {
      continue;
    }

    let devidedModule: string = "";
    let devidedPeriod: string[];
    let isABC: boolean = false;

    devidedPeriod =
      period.length > 4 || period.indexOf("・") != -1
        ? formedPeriod(period)
        : [period];

    for (let j: number = 1; j < module.length; j++) {
      for (let l: number = 0; l < devidedPeriod.length; l++) {
        if (module.slice(1) === "ABC") {
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
    devidedPeriod =
      period.length > 4 || period.indexOf("・") != -1
        ? formedPeriod(period)
        : [period];

    for (let j: number = 1; j < module.length; j++) {
      for (let l: number = 0; l < devidedPeriod.length; l++) {
        devidedModule = module[0] + module[j];
        let rescheduleIndex: number = rescheduledClass.indexOf(
          devidedModule + ":" + period[0]
        );
        if (rescheduleIndex !== -1) {
          icsEvent =
            addReschedule(rescheduleIndex, devidedPeriod[l]) +
            getMisc(name, classroom, description);
          output += eventBegin + icsEvent + eventEnd;
        }
      }
    }
  }
  return output;
};

export default { parseCsv };
