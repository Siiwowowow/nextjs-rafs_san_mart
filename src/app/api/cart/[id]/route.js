import { ObjectId } from "mongodb";
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const cartCollection = await dbConnect(collectionNameObject.cartCollection);

    const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const cartCollection = await dbConnect(collectionNameObject.cartCollection);

    const result = await cartCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity: body.quantity } }
    );

    return Response.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
