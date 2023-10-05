import { excelToPersonObjects } from "./convertor.js";
import { connectToDB } from "./connectToDB.js";
import * as dotenv from "dotenv";

dotenv.config();

console.log("start");

await connectToDB(process.env.MONGO_URL);

await excelToPersonObjects(process.env.EXCEL_PATH);
