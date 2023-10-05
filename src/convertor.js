import { insertData, getClient } from "./connectToDB.js";
import * as xlsx from "xlsx";
import * as fs from "fs";
import { faker } from '@faker-js/faker';


export const excelToPersonObjects = async (inputFilePath) => {
  try {
    const client = await getClient();

    const fileData = fs.readFileSync(inputFilePath);

    const workbook = xlsx.read(fileData, { type: "buffer" });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(worksheet);

    console.info(data);
    await Promise.all(
      data.map(async (voterData) => {
        const voter = {
          _id: faker.string.uuid(),
          firstName: voterData.firstName,
          lastName: voterData.lastName,
          birthday: voterData.birthday,
          sex: voterData.sex,
        };
        await insertData(client, voter);
        console.log(`${voter.firstName} added to db`);
      })
    );
  } catch (error) {
    console.error(error);
  }
};
