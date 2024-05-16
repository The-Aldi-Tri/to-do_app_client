import { nanoid } from "nanoid";
function convertDateTimeToWIB(dateTime) {
  // WIB: Waktu Indonesia bagian Barat => GMT+7
  const [date, time] = dateTime
    .toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })
    .replace(",", "")
    .split(" ");
  const revDate = date.split("/").reverse().join("/");
  return `${revDate} ${time}`;
}

function createData(
  task,
  details,
  dateTime = new Date(),
  finished = false,
  id = nanoid(10)
) {
  return {
    task,
    details,
    dateTime: convertDateTimeToWIB(dateTime),
    finished,
    id,
  };
}

export default createData;
