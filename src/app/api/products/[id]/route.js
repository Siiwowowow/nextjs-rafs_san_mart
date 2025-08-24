import dbConnect, { collectionNameObject } from '@/lib/dbConnet';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const productCollection = await dbConnect(collectionNameObject.productCollection);
    const product = await productCollection.findOne({ _id: new ObjectId(id) });

    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
