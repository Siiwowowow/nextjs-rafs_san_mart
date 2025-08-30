import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET cart items by user email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const cartCollection = await dbConnect(collectionNameObject.cartCollection);

    const items = await cartCollection.find({ userEmail: email }).toArray();
    return Response.json({ success: true, items });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: "Failed to fetch cart" }, { status: 500 });
  }
}

// POST add item to cart
export async function POST(req) {
  try {
    const body = await req.json();
    const cartCollection = await dbConnect(collectionNameObject.cartCollection);
    const result = await cartCollection.insertOne(body);
    return Response.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: "Failed to add to cart" }, { status: 500 });
  }
}

// PATCH update quantity
export async function PATCH(req) {
  try {
    const { id, quantity } = await req.json();
    const cartCollection = await dbConnect(collectionNameObject.cartCollection);
    const result = await cartCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity } }
    );
    return Response.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: "Failed to update cart" }, { status: 500 });
  }
}

// DELETE remove item from cart
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const cartCollection = await dbConnect(collectionNameObject.cartCollection);
    const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });
    return Response.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: "Failed to delete cart item" }, { status: 500 });
  }
}
