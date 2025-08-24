import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObject = {
  productCollection: "products",
  userCollection: "users",
  cartCollection: "cart",
};

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default function dbConnect(collectionName) {
  return client.db(process.env.DB_NAME).collection(collectionName);
}
