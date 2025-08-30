import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const productCollection = await dbConnect(collectionNameObject.productCollection);
    const product = await productCollection.findOne({ _id: new ObjectId(id) });

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // Convert _id to string for frontend
    product._id = product._id.toString();

    return NextResponse.json(product);
  } catch (err) {
    console.error("API GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
