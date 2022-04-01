"use strict";
//Global variables
Object.defineProperty(exports, "__esModule", { value: true });
const beginSpringA = {
    月: "20220418",
    火: "20220419",
    水: "20220413",
    木: "20220414",
    金: "20220415",
    土: "20210416"
};
const beginSpringB = {
    月: "20220530",
    火: "20220531",
    水: "20220525",
    木: "20220526",
    金: "20220527",
    土: "20220528"
};
const beginSpringC = {
    月: "20220711",
    火: "20220712",
    水: "20220706",
    木: "20220707",
    金: "20220708",
    土: "20220709"
};
const beginFallA = {
    月: "20221003",
    火: "20221004",
    水: "20221005",
    木: "20221006",
    金: "20221007",
    土: "20221008"
};
const beginFallB = {
    月: "20221114",
    火: "20221115",
    水: "20221116",
    木: "20221117",
    金: "20221111",
    土: "20221112"
};
const beginFallC = {
    月: "20230123",
    火: "20230110",
    水: "20230111",
    木: "20230112",
    金: "20230106",
    土: "20230117"
};
const springEndDate = {
    A: "20220523T130000Z;",
    B: "20220628T130000Z;",
    C: "20220809T130000Z;"
};
const fallEndDate = {
    A: "20221109T130000Z;",
    B: "20221221T130000Z;",
    C: "20230214T130000Z;"
};
const engWeekday = {
    月: "MO",
    火: "TU",
    水: "WE",
    木: "TH",
    金: "FR",
    土: "SA"
};
const weekdayList = ["月", "火", "水", "木", "金", "土"];
//the head element(0) is a dummy
const classBeginPeriod = [
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
const classEndPeriod = [
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
const springAHolidays = [
    "20220502",
    "20220503",
    "20220504",
    "20220505",
    "20220506"
];
const springBHolidays = [];
const springCHolidays = [];
const fallAHolidays = [
    "20221103",
    "20221104",
    "20221107",
    "20221108",
    "20221109"
];
const fallBHolidays = [
    "20221123",
    "20221128",
    "20221129",
    "20221130",
    "20221225"
];
const fallCHolidays = ["20230113", "20230116", "20230117"];
const springABCHolidays = [
    "20220502",
    "20220503",
    "20220504",
    "20220505",
    "20220506",
    "20220524"
];
const fallABCHolidays = [
    "20221103",
    "20221104",
    "20221107",
    "20221108",
    "20221109",
    "20221110",
    "20221123",
    "20221125",
    "20221128",
    "20221129",
    "20221130",
    "20221229",
    "20221230",
    "20221231",
    "20230102",
    "20230103",
    "20230104",
    "20230105",
    "20230109",
    "20230113",
    "20230116",
    "20230117",
    "20230208",
    "20230209",
    "20230210",
    "20230213",
    "20230214"
];
//Date:Module:Class schedule of the day
const rescheduledDateList = [
    "20220506",
    "20221108",
    "20221109",
    "20221125",
    "20230117"
];
const rescheduledClassList = [
    "春A:火",
    "秋B:木",
    "秋B:金",
    "秋B:水",
    "秋C:月"
];
const deadlinesDate = [
    "20210407",
    "20210420",
    "20210511",
    "20210526",
    "20210622",
    "20210707",
    "20210921",
    "20211014",
    "20211101",
    "20211117",
    "20211222",
    "20220118"
];
const deadlinesDetail = [
    "春A事前登録締め切り日",
    "春A履修登録締切日",
    "春B事前登録締め切り日",
    "春B履修登録締切日",
    "春C事前登録締め切り日",
    "春C履修登録締切日",
    "秋A事前登録締め切り日",
    "秋A履修登録締切日",
    "秋B事前登録締め切り日",
    "秋B履修登録締切日",
    "秋C事前登録締め切り日",
    "秋C履修登録締切日"
];
const addZero = (str) => {
    return str.length === 1 && str !== "T" ? "0" + str : str;
};
const isAvailableModule = (module) => {
    return !(module.indexOf("春") === -1 && module.indexOf("秋") === -1);
};
const isAvaibaleDay = (period) => {
    //There's no Sunday class in the year
    return weekdayList.includes(period.slice(0, 1));
};
const getModulePeriodList = (moduleList, periodList) => {
    let modulePeriodList = [];
    let tmpList = [];
    if (moduleList.length === 1 && periodList.length > 1) {
        for (let i = 0; i < periodList.length; i++) {
            tmpList = tmpList.concat(periodList[i]);
        }
        periodList = [tmpList];
    }
    for (let i = 0; i < moduleList.length; i++) {
        for (let j = 0; j < moduleList[i].length; j++) {
            for (let k = 0; k < periodList[i].length; k++) {
                modulePeriodList.push([moduleList[i][j], periodList[i][k]]);
            }
        }
    }
    return modulePeriodList;
};
const getSpan = (module, period) => {
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
    }
    else {
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
    return (DTSTART +
        beginDate +
        "T" +
        beginPeriod +
        "\n" +
        DTEND +
        beginDate +
        "T" +
        endPeriod +
        "\n");
};
const addReschedule = (index, period) => {
    let beginDate = rescheduledDateList[index];
    const DTSTART = "DTSTART;TZID=Asia/Tokyo:";
    const DTEND = "DTEND;TZID=Asia/Tokyo:";
    //Get the start and end time of the course
    let beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
    let endPeriod = classEndPeriod[parseInt(period.slice(-1))];
    return (DTSTART +
        beginDate +
        "T" +
        beginPeriod +
        "\n" +
        DTEND +
        beginDate +
        "T" +
        endPeriod +
        "\n");
};
const getRepeat = (module, period) => {
    let rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
    let exdate;
    rrule +=
        module[0] == "春"
            ? springEndDate[module.slice(-1)]
            : fallEndDate[module.slice(-1)];
    rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
    exdate = removeHolidays(module, period);
    return rrule + exdate;
};
//For ABC module class
const getABCRepeat = (module, period) => {
    let rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
    let exdate;
    rrule += module[0] == "春" ? "20210729T130000Z;" : "20220208T130000Z;";
    rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
    exdate = removeABCHolidays(module, period);
    return rrule + exdate;
};
const getMisc = (name, classroom, desc) => {
    //Create a timestamp for this year
    const year = "2021";
    const month = "4";
    const date = "8";
    const hour = "0";
    const minute = "0";
    const timeStampList = [year, month, date, "T", hour, minute, "00"];
    const timeStamp = timeStampList.map(x => addZero(x)).join("");
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
};
const removeHolidays = (module, period) => {
    let beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
    let holidaysList = [];
    let exdate = "EXDATE:";
    if (module[0] === "春") {
        for (let i = 1; i < module.length; i++) {
            if (module[i] === "A")
                holidaysList = holidaysList.concat(springAHolidays);
            else if (module[i] === "B")
                holidaysList = holidaysList.concat(springBHolidays);
            else if (module[i] === "C")
                holidaysList = holidaysList.concat(springCHolidays);
        }
    }
    if (module[0] === "秋") {
        for (let i = 1; i < module.length; i++) {
            if (module[i] === "A")
                holidaysList = holidaysList.concat(fallAHolidays);
            else if (module[i] === "B")
                holidaysList = holidaysList.concat(fallBHolidays);
            else if (module[i] === "C")
                holidaysList = holidaysList.concat(fallCHolidays);
        }
    }
    //Check if the list is blank
    if (!holidaysList.length) {
        return "";
    }
    for (let i = 0; i < holidaysList.length; i++) {
        exdate += holidaysList[i] + "T" + beginPeriod + ",";
    }
    return exdate + "\n";
};
//For ABC classes
const removeABCHolidays = (module, period) => {
    let beginPeriod = classBeginPeriod[parseInt(period.slice(1, 2))];
    let holidaysList;
    let exdate = "EXDATE:";
    holidaysList = module[0] == "春" ? springABCHolidays : fallABCHolidays;
    for (let i = 0; i < holidaysList.length; i++) {
        exdate += holidaysList[i] + "T" + beginPeriod + ",";
    }
    return exdate + "\n";
};
const addDeadlines = () => {
    let deadlinesList = [];
    let misc = "DTSTAMP:20210408T000000\nCREATED:20210408T000000\nSTATUS:CONFIRMED\nTRANSP:TRANSPARENT\n";
    let dtstart;
    let dtend;
    let nextDate;
    let summary;
    let icsEvent;
    for (let i = 0; i < deadlinesDate.length; i++) {
        dtstart = "DTSTART;VALUE=DATE:" + deadlinesDate[i] + "\n";
        nextDate = String(Number(deadlinesDate[i]) + 1);
        dtend = "DTEND;VALUE=DATE:" + nextDate + "\n";
        summary = "SUMMARY:" + deadlinesDetail[i] + "\n";
        icsEvent =
            "BEGIN:VEVENT" + dtstart + dtend + misc + summary + "END:VEVENT\n";
        deadlinesList.push(icsEvent);
    }
    return deadlinesList.join("");
};
const parseCsv = (idList, kdb, isChecked) => {
    let output = "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinC 1.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";
    idList = idList.map(x => x.replace(/[\"]/g, ""));
    idList = idList.map(x => x.replace(/\r/g, ""));
    const eventBegin = "BEGIN:VEVENT\n";
    const eventEnd = "\nEND:VEVENT\n";
    let courseList = [];
    let isValid = false;
    let isABC;
    //Search courses
    for (let i = 0; i < idList.length - 1; i++) {
        try {
            courseList.push(kdb[idList[i]]);
        }
        catch (error) {
            //Do nothing
        }
    }
    for (let i = 0; i < courseList.length; i++) {
        const name = courseList[i].name;
        const moduleList = courseList[i].module;
        const periodList = courseList[i].period;
        const classroom = courseList[i].room;
        const description = courseList[i].description;
        const modulePeriodList = getModulePeriodList(moduleList, periodList);
        let module;
        let period;
        let devidedModule;
        let devidedPeriod;
        let rescheduleIndex;
        for (let j = 0; j < modulePeriodList.length; j++) {
            module = modulePeriodList[j][0];
            period = modulePeriodList[j][1];
            let icsEvent = "";
            if (!isAvailableModule(module) || !isAvaibaleDay(period))
                continue;
            if (module.slice(1) === "ABC") {
                isABC = true;
                icsEvent =
                    getSpan(module, period) +
                        getABCRepeat(module, period) +
                        getMisc(name, classroom, description);
                output += eventBegin + icsEvent + eventEnd;
            }
            else {
                icsEvent =
                    getSpan(module, period) +
                        getRepeat(module, period) +
                        getMisc(name, classroom, description);
                output += eventBegin + icsEvent + eventEnd;
                isABC = false;
            }
            for (let k = 1; k < module.length; k++) {
                devidedModule = module[0] + module[k];
                devidedPeriod = period[0];
                rescheduleIndex = rescheduledClassList.indexOf(devidedModule + ":" + devidedPeriod);
                if (rescheduleIndex !== -1) {
                    icsEvent =
                        addReschedule(rescheduleIndex, period) +
                            getMisc(name, classroom, description);
                    output += eventBegin + icsEvent + eventEnd;
                }
            }
        }
    }
    //Add register deadlines to the calendar if checked
    if (isChecked) {
        //現在履修期限が不明のため登録しない
        //output += addDeadlines();
    }
    return [output, true];
};
exports.default = { parseCsv };
