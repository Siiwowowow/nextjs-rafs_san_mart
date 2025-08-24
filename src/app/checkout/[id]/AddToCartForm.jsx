'use client'
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

export default function AddToCartForm({ product }) {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const colors = Array.isArray(product.color) ? product.color : [];
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [totalPrice, setTotalPrice] = useState(product.offerPrice || 0);

  const router = useRouter();

  useEffect(() => setTotalPrice((quantity * product.offerPrice).toFixed(2)), [quantity, product.offerPrice]);

  const handleAddToCart = async () => {
    if (!userEmail) return alert("Please log in to add items to cart.");

    const cartItem = { productId: product._id, name: product.name, color: selectedColor, quantity, price: product.offerPrice, totalPrice, userEmail };

    const res = await fetch("/api/cart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cartItem) });
    const data = await res.json();

    if (!res.ok) return alert(data.error || "Failed to add to cart");

    // ✅ update navbar badge
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    // ✅ redirect to cart
    router.push("/cart");
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-500 line-through">${product.price}</p>
      <p className="text-2xl font-semibold">${totalPrice}</p>
      <div>
        <label className="block text-gray-700">Quantity</label>
        <input type="number" min="1" max={product.stock} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border p-2 rounded w-20 mt-1" />
      </div>
      {colors.length > 0 && (
        <div>
          <label className="block text-gray-700">Color</label>
          <div className="flex gap-2 mt-1">
            {colors.map((c, i) => (
              <button key={i} type="button" className={`px-4 py-2 border rounded ${selectedColor === c ? "border-blue-500" : ""}`} onClick={() => setSelectedColor(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      <div>
        <label className="block text-gray-700">Shipping Address</label>
        <textarea placeholder="Enter your address" className="border p-2 rounded w-full mt-1" />
      </div>
      <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Add to Cart</button>
    </div>
  );
}
