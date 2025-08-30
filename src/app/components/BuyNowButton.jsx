"use client";
import { loadStripe } from "@stripe/stripe-js";

// Only load Stripe if the environment variable is available
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function BuyNowButton({ product }) {
  const handleBuyNow = async () => {
    try {
      // Check if Stripe is available
      if (!stripePromise) {
        alert("Stripe is not configured. Please check your environment variables.");
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      const { id, error } = await res.json();
      if (error) {
        alert("Error: " + error);
        return;
      }

      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: id });
      }
    } catch (err) {
      console.error("Buy now error:", err);
      alert("An error occurred while processing your purchase.");
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
    >
      Buy now
    </button>
  );
}
