import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const productCollection = await dbConnect(collectionNameObject.productCollection);

    const newProduct = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await productCollection.insertOne(newProduct);

    return NextResponse.json(
      { message: "✅ Product added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error inserting product:", error);
    return NextResponse.json(
      { message: "Failed to add product", error: error.message },
      { status: 500 }
    );
  }
}