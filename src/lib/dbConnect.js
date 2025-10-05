import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObject = {
  productCollection: "products",
  userCollection: "users",
  cartCollection: "cart",
  chatCollection: "chats",
};

let client = null;

async function getClient() {
  if (!client) {
    if (!process.env.NEXT_PUBLIC_MONGO_URI) {
      throw new Error("MongoDB URI is not configured");
    }
    client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    await client.connect();
  }
  return client;
}

export default async function dbConnect(collectionName) {
  const client = await getClient();
  if (!process.env.DB_NAME) {
    throw new Error("Database name is not configured");
  }
  return client.db(process.env.DB_NAME).collection(collectionName);
}
