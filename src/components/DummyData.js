import { nanoid } from "nanoid";
function convertWIB(date) {
  return date.toLocaleString("en-GB", { timeZone: "Asia/Jakarta" }) + " WIB";
}

function createData(task, details, time, finished = false, id = nanoid(10)) {
  return {
    task,
    details,
    time: convertWIB(time),
    finished,
    id,
  };
}

const rows = [
  createData("Task 1", "No Description", new Date("2024-05-15T09:00:00"), true), // Empty description
  createData("Task 2", "A short description", new Date("2024-05-16T10:30:00")), // Short description
  createData(
    "Task 3",
    "A longer description for Task 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    new Date("2024-05-17T13:45:00")
  ), // Longer description
  createData("Task 4", "", new Date("2024-05-18T15:15:00")), // Empty description
  createData(
    "Task 5",
    "Another short description",
    new Date("2024-05-19T17:00:00")
  ), // Short description
  createData("Task 6", "Description 6", new Date("2024-05-20T08:00:00")),
  createData("Task 7", "Description 7", new Date("2024-05-21T09:30:00")),
  createData("Task 8", "Description 8", new Date("2024-05-22T10:45:00")),
  createData("Task 9", "Description 9", new Date("2024-05-23T11:15:00")),
  createData("Task 10", "Description 10", new Date("2024-05-24T12:00:00")),
  createData("Task 11", "Description 11", new Date("2024-05-24T12:00:00")),
];

export default rows;
