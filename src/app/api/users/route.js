import dbConnect from "@/lib/dbConnet";


export async function POST(req) {
  const data = await req.json();
  const collection = await dbConnect("users");

  // Check if user exists
  const existingUser = await collection.findOne({ clerkId: data.clerkId });

  if (existingUser) {
    // Update last login
    await collection.updateOne(
      { clerkId: data.clerkId },
      { $set: { ...data, lastLogin: new Date().toISOString(), updatedAt: new Date() } }
    );
  } else {
    // Insert new user with createdAt and lastLogin
    await collection.insertOne({
      ...data,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
  }

  return new Response(JSON.stringify({ message: "User saved" }), { status: 200 });
}
