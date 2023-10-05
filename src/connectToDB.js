import { MongoClient } from "mongodb";

let client = null;

export const connectToDB = async (url) => {
  try {
    client = new MongoClient(url);
    await client.connect();
    console.info("Successfully connected to DB");
  } catch (error) {
    console.log("cant connect");
    throw new Error("Failed to connect to mongodb", { cause: error });
  }
};

export const insertData = async (client, data) => {
  const collection = client
    .db(process.env.DB_NAME)
    .collection(process.env.COLLECTION_NAME);

  try {
    const result = await collection.insertOne(data);
    console.log("Inserted data:", result.ops);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

export const getClient = () => client;
