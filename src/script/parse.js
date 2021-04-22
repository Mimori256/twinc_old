function parseCsv(idList, kdb) { 
  idList = idList.map(x => x.replace(/[\"]/g, ""));
  idList = idList.map(x => x.replace(/\r/g, ""));
  console.log(idList)

  let i = 1;
  let j = 0;
  let list = [];
  console.log(kdb["GA15121"]);

  for (let i=1; i<idList.length; i++) {
    console.log(idList[i]);
    console.log(kdb[String(idList[i])]);
  }
  
    return 0;
}
export default { parseCsv };
