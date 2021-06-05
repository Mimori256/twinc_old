//Global variables

const beginSpringA: { [key: string]: string } = {
  月: "20210412",
  火: "20210413",
  水: "20210414",
  木: "20210408",
  金: "20210409",
  土: "20210410"
};
const beginSpringB: { [key: string]: string } = {
  月: "20210524",
  火: "20210525",
  水: "20210526",
  木: "20210520",
  金: "20210521",
  土: "20210522"
};
const beginSpringC: { [key: string]: string } = {
  月: "20210705",
  火: "20210706",
  水: "20210707",
  木: "20210701",
  金: "20210702",
  土: "20210703"
};
const beginFallA: { [key: string]: string } = {
  月: "20211004",
  火: "20211005",
  水: "20211006",
  木: "20211007",
  金: "20211001",
  土: "20211002"
};
const beginFallB: { [key: string]: string } = {
  月: "20211115",
  火: "20211116",
  水: "20211117",
  木: "20211111",
  金: "20211112",
  土: "20211113"
};
const beginFallC: { [key: string]: string } = {
  月: "20220124",
  火: "20220111",
  水: "20220112",
  木: "20220106",
  金: "20220107",
  土: "20220108"
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
  金: "FR",
  土: "SA"
};

const weekdayList: string[] = ["月", "火", "水", "木", "金", "土"];

//the head element(0) is a dummy
const classBeginPeriod: string[] = [
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
const classEndPeriod: string[] = [
  "0",
  "095500",
  "112500",
  "133000",
  "150000",
  "163000",
  "180000",
  "193500",
  "210000"
];

const springAHolidays: string[] = [
  "20210429",
  "20210503",
  "20210504",
  "20210505",
  "20210507"
];
const springBHolidays: string[] = [];
const springCHolidays: string[] = ["20210722", "20210723"];
const fallAHolidays: string[] = [
  "20211103",
  "20211105",
  "20211108",
  "20211109"
];
const fallBHolidays: string[] = [
  "20211123",
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
const rescheduledDateList: string[] = [
  "20210507",
  "20210722",
  "20211109",
  "20211125",
  "20220113",
  "20220118"
];

const rescheduledClassList: string[] = [
  "春A:水",
  "春C:金",
  "秋B:水",
  "秋B:火",
  "秋C:金",
  "秋C:月"
];

const addZero = (str: string): string => {
  return str.length === 1 && str !== "T" ? "0" + str : str;
};

const isAvailableModule = (module: string): boolean => {
  return !(module.indexOf("春") === -1 && module.indexOf("秋") === -1);
};

const isAvaibaleDay = (period: string): boolean => {
  //There's no Sunday class in the year
  return weekdayList.includes(period.slice(0, 1));
};

const isCombinedModule = (module: string): boolean => {
  const springCount: number = ( module.match( /春/g ) || [] ).length ;
  const fallCount: number = ( module.match( /秋/g ) || [] ).length ;
  return springCount + fallCount > 1;
};

//Remove special module class
const removeSpecialModule = (module: string): string => {
  const removeList: string[] = [" 夏季休業中", " 春季休業中"];

  for (let i: number = 0; i < removeList.length; i++) {
    module = module.replace(removeList[i], "");
  }

  return module;
};

const getDayCount = (period: string): number => {
  let count: number = 0;
  for (const day of weekdayList) {
    if (period.indexOf(day) !== -1) count++;
  }
  return count;
};

const removeSpecialPeriod = (period: string): string => {
  const removeList: string[] = [
    " 集中",
    ",集中",
    " 随時",
    ",随時",
    " 応談",
    ",応談"
  ];
  for (let i: number = 0; i < removeList.length; i++) {
    period = period.replace(removeList[i], "");
  }
  return period;
};

const getDayIndex = (period: string): number[] => {
  let dayIndexList: number[] = [];
  for (let i: number = 0; i < period.length; i++) {
    if (weekdayList.indexOf(period[i]) !== -1) {
      dayIndexList.push(i);
    }
  }
  dayIndexList.pop(); 
  return dayIndexList;
};

const getModuleSeparateIndex = (module: string): number => {
  const seasonList: string[] = ["春", "秋"];
  let count: number = 0;
  let index: number = 0;
  for (let i:number = 0; i<module.length; i++) {
    if (seasonList.includes(module[i])) count++;
    if (count === 2) index = i; 
  } 
  return index;
}

/*
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
*/

const formedPeriod = (period: string): string => {
  //Use ":" as a separator
  period = period.replace("・", "");
  let listedPeriod = Array.from(period);
  const dayCount: number = getDayCount(period);
  if (dayCount === 1) return period;
  const dayIndex: number[] = getDayIndex(period);
  const numInfo: string = period.slice((dayIndex[dayIndex.length -1 ] +2));
  let count: number = 0;
  for (let i: number = 0; i< listedPeriod.length; i++) {
    if(weekdayList.includes(listedPeriod[i])) {
      listedPeriod[i] = listedPeriod[i] + numInfo + ":";
      count++
    }
    if(count === dayCount) break;
  }
  return listedPeriod.join("");
};

const separateModule = (moduleList: string[], periodList: string[]): string[][] => {
  let newModuleList :string[] = [];
  let newPeriodList: string[] = [];
  let tmp1: string = "";
  let tmp2: string = "";
  for (let i: number = 0; i < moduleList.length; i++) {
    if(isCombinedModule(moduleList[i])) {
    let separateIndex: number = getModuleSeparateIndex(moduleList[i]);  
    //First module
    tmp1 = moduleList[i].slice(0,separateIndex);
    //Second module
    tmp2 = moduleList[i].slice(separateIndex);
    newModuleList.push(tmp1);
    newModuleList.push(tmp2);
    newPeriodList.push(periodList[i]);
    newPeriodList.push(periodList[i]);
    }
  }  
  return [newModuleList, newPeriodList];
}

const createClassList = (moduleTmp: string[], periodTmp: string[]): string[][] => {

  [moduleTmp, periodTmp] = separateModule(moduleTmp, periodTmp)

  let moduleList: string[] = [];
  let periodList: string[] = [];
  for (let i: number = 0; i < periodTmp.length; i++) {
      try {
        if (moduleTmp[i] !== "" && periodTmp[i] !== "") {
          moduleList.push(moduleTmp[i]);
          periodList.push(periodTmp[i]);
      }else {
        continue;
      }
    
    }
      //Index error
      catch(error) {
        moduleList.push(moduleTmp[moduleTmp.length -1]);
        periodList.push(periodTmp[i]);
      }
    }

    let classList: string[][] = [];

    periodList.map(x => formedPeriod(x));

    for (let i: number = 0; i < length; i++) {
      classList.push([moduleList[i], periodList[i]]);
    }

    return classList;

}


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
  let beginDate: string = rescheduledDateList[index];
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

//For ABC module class
const getABCRepeat = (module: string, period: string): string => {
  let rrule: string = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate: string;

  rrule += module[0] == "春" ? "20210729T130000Z;" : "20220208T130000Z;";

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeABCHolidays(module, period);
  return rrule + exdate;
};

const getMisc = (name: string, classroom: string, desc: string): string => {
  //Create a timestamp for this year
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

const parseCsv = (
  idList: string[],
  kdb: { [key: string]: string }
): [string, boolean] => {
  let output: string =
    "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinC 1.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";

  idList = idList.map(x => x.replace(/[\"]/g, ""));
  idList = idList.map(x => x.replace(/\r/g, ""));

  const eventBegin: string = "BEGIN:VEVENT\n";
  const eventEnd: string = "\nEND:VEVENT\n";
  let courseList: string[] = [];
  let isValid: boolean = false;

  //Search courses
  for (let i: number = 0; i < idList.length - 1; i++) {
    try {
      courseList.push(kdb[idList[i]]);
    } catch (error) {
      //Do nothing
    }
  }

  for (let i: number = 0; i < courseList.length; i++) {
    const name: string = courseList[i][0];
    const module: string = courseList[i][1];
    const period: string = courseList[i][2];
    const classroom: string = courseList[i][3];
    const description: string = courseList[i][4];

    let icsEvent: string = "";

    if (!isAvailableModule(module) || !isAvaibaleDay(period)) {
      continue;
    }

    isValid = true;

    let isABC: boolean = false;

    const moduleTmp: string[] = module.split(" ").map(removeSpecialModule);
    const periodTmp: string[] = period.split(" ").map(removeSpecialPeriod);

    //classList: [moduleList, periodList]
    const classList: string[][] = createClassList(moduleTmp, periodTmp);

    
    /* if (isMultipleTerms(module) === true) {
      let devidePositioin: number = module.indexOf("秋");
    } else {
      moduleList = [module];
    }
    */
    
    for (let j: number=0; j < classList[0].length; j++) {

          if (classList[j][0].slice(1) === "ABC") {
            isABC = true;
            icsEvent =
              getSpan(classList[j][0], classList[j][1]) +
              getABCRepeat(classList[j][0], classList[j][1]) +
              getMisc(name, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
          } else {
            icsEvent =
              getSpan(classList[j][0], classList[j][0]) +
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
}

    //reschedule
    devidedPeriod = parsePeriod(period);

    //Semester loop
    for (let j: number = 0; j < moduleList.length; j++) {
      //Module loop
      for (let k: number = 1; k < moduleList[j].length; k++) {
        //Period loop
        for (let l: number = 0; l < devidedPeriod.length; l++) {
          devidedModule = module[0] + module[k];
          let rescheduleIndex: number = rescheduledClassList.indexOf(
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
  }
  return [output, isValid];
};

export default { parseCsv };
