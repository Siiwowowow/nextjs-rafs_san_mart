// src/app/checkout/[id]/page.jsx
import React from "react";
import AddToCartForm from "./AddToCartForm";

export default async function Checkout({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="text-gray-500 mt-2">{product.description}</p>

      <div className="flex flex-col md:flex-row gap-10 mt-6">
        {/* Show only the first image */}
        <div className="flex-1">
          <img
            src={product.image[0]} 
            alt={product.name} 
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Interactive Add to Cart Form */}
        <div className="flex-1">
          <AddToCartForm product={product} />
        </div>
      </div>
    </div>
  );
}
