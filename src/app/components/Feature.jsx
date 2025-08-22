'use client';

import React from 'react';

export default function Feature() {
  const features = [
    {
      title: "Fast & Secure Checkout",
      description: "Experience smooth and secure payment options with multiple gateways.",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png",
    },
    {
      title: "Wide Product Selection",
      description: "Explore thousands of products across categories to find exactly what you need.",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png",
    },
    {
      title: "Easy Returns & Refunds",
      description: "Hassle-free returns and quick refunds to ensure a stress-free shopping experience.",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png",
    },
    {
      title: "Real-time Order Tracking",
      description: "Track your orders from warehouse to doorstep in real time.",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png",
    },
    {
      title: "Exclusive Discounts",
      description: "Get special deals and discounts on selected products regularly.",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png",
    },
    {
      title: "24/7 Customer Support",
      description: "Our support team is always ready to help with any inquiries or issues.",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-base-800">Why Shop With Us</h2>
        <p className="text-sm text-base-500 mt-2 max-w-lg mx-auto">
          Discover the features that make our e-commerce platform safe, convenient, and enjoyable.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="max-w-xs bg-base-100 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 p-5 text-center"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="mx-auto h-24 w-24 object-contain rounded-lg"
            />
            <h3 className="text-lg font-semibold text-base-800 mt-4">{feature.title}</h3>
            <p className="text-sm text-base-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
