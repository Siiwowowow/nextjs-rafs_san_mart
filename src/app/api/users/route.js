import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function GET() {
  const usersCollection = await dbConnect(collectionNameObject.userCollection);
  const users = await usersCollection.find({}).toArray();
  return Response.json(users);
}

export async function POST(req) {
  const data = await req.json();
  const collection = await dbConnect(collectionNameObject.userCollection);

  const existingUser = await collection.findOne({ clerkId: data.clerkId });

  if (existingUser) {
    // Update existing user - preserve role but update other fields
    const updatedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      lastLogin: new Date().toISOString(),
      updatedAt: new Date(),
      // Keep the existing role from database - don't overwrite it
      role: existingUser.role
    };

    await collection.updateOne(
      { clerkId: data.clerkId },
      { $set: updatedData }
    );
  } else {
    // Insert new user with role = "user"
    const newUserData = {
      clerkId: data.clerkId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: "user", // default role for new users
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newUserData);
  }

  return new Response(JSON.stringify({ message: "User saved" }), { status: 200 });
}