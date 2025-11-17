"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function BuyNowButton({ product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStripe = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      
      if (!res.ok) throw new Error("Stripe session creation failed");
      
      const { id } = await res.json();
      const stripe = await stripePromise;
      
      if (!stripe) throw new Error("Stripe not initialized");
      
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (err) {
      console.error("Stripe Error:", err);
      setError("Stripe payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSSLCommerz = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ssl-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          product, 
          userEmail: "customer@example.com" // Replace with actual user email
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "SSLCommerz initialization failed");
      }

      if (data.redirectURL) {
        window.location.href = data.redirectURL;
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (err) {
      console.error("SSLCommerz Error:", err);
      setError("SSLCommerz payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-indigo-300 transition"
      >
        {loading ? "Processing..." : "Buy now"}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg space-y-4 w-80">
            <h2 className="text-lg font-bold text-center">Choose Payment Method</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              onClick={handleStripe}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              Pay with Stripe
            </button>
            
            <button
              onClick={handleSSLCommerz}
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300 transition"
            >
              Pay with SSLCommerz
            </button>
            
            <button
              onClick={() => {
                setOpen(false);
                setError("");
              }}
              disabled={loading}
              className="w-full py-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}