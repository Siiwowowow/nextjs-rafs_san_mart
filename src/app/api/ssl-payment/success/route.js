import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tran_id = searchParams.get('tran_id');
  
  console.log("Payment successful for transaction:", tran_id);
  
  // Redirect to success page
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?tran_id=${tran_id}`);
}