import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGO_URI);

export async function POST(req) {
  const { name, email, password } = await req.json();

  await client.connect();
  const db = client.db("nextauth_demo");
  const users = db.collection("users");

  const existingUser = await users.findOne({ email });
  if (existingUser) return new Response(JSON.stringify({ message: "User exists" }), { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await users.insertOne({ name, email, password: hashedPassword });

  return new Response(JSON.stringify({ message: "User created", userId: result.insertedId }), { status: 201 });
}
