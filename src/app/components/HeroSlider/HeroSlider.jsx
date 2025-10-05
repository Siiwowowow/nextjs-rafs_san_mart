"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import image1 from "../../../../public/assets/img1.jpg";
import image2 from "../../../../public/assets/img2.jpg";
import image3 from "../../../../public/assets/img3.jpg";
import image4 from "../../../../public/assets/img4.jpg";
import banner1 from "../../../../public/assets/banner1.jpg";
import banner6 from "../../../../public/assets/banner6.jpg";
import banner7 from "../../../../public/assets/banner7.jpg";
import banner4 from "../../../../public/assets/banner4.png";
import banner5 from "../../../../public/assets/banner5.png";

const slides = [
  {
    id: 1,
    url: banner1,
    title: "Fast & Reliable Service",
    subtitle: "We deliver your products safely and quickly.",
  },
  {
    id: 2,
    url: banner6,
    title: "Global Coverage",
    subtitle: "Connecting businesses and people worldwide.",
  },
  {
    id: 3,
    url: banner7,
    title: "Secure Delivery",
    subtitle: "Your trust is our priority.",
  },
  {
    id: 4,
    url: banner4,
    title: "Secure Delivery",
    subtitle: "Your trust is our priority.",
  },
  {
    id: 5,
    url: banner5,
    title: "Secure Delivery",
    subtitle: "Your trust is our priority.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // ✅ Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-11/12 max-w-7xl mx-auto my-8 gap-8">
        {/* ✅ Carousel Section */}
        <div className="relative w-full lg:w-8/12 h-96 rounded-xl overflow-hidden shadow-lg">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.url}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              {/* ✅ Text Overlay */}
              <div className="absolute inset-0  flex flex-col items-center justify-center text-center text-white px-6">
                {/* <h2 className="text-3xl font-bold">{slide.title}</h2>
                <p className="mt-2 text-lg">{slide.subtitle}</p> */}
              </div>
            </div>
          ))}

          {/* ✅ Navigation Arrows */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
          >
            ❮
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
          >
            ❯
          </button>
        </div>

        {/* ✅ Image Grid Section */}
        <div className="w-full lg:w-4/12 grid grid-cols-2 gap-2">
          {[image1, image2, image3, image4].map((img, i) => (
            <div
              key={i}
              className="h-48 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={img}
                alt={`Image ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
