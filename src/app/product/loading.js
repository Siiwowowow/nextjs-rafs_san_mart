import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <div className="absolute top-1 left-1 right-1 bottom-1 rounded-full border-4 border-t-transparent border-purple-500 animate-spin [animation-duration:1.5s]"></div>
      </div>

      {/* Loading text */}
      <span className="ml-4 text-lg font-semibold text-gray-700 animate-pulse">
        Loading...
      </span>
    </div>
  );
}
