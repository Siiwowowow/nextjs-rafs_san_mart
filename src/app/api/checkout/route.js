import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(req) {
  try {
    const { product } = await req.json();

    if (!product) {
      return NextResponse.json({ error: "No product data" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name || "Untitled",
              description: Array.isArray(product.description)
                ? product.description.join(", ")
                : product.description || "",
              images: product.image
                ? Array.isArray(product.image)
                  ? product.image
                  : [product.image]
                : [],
            },
            unit_amount: Math.round(product.offerPrice * 100), // must be an integer
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
