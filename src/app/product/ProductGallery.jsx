
'use client';

import React from 'react';

export default function ProductGallery({ images }) {
  const [thumbnail, setThumbnail] = React.useState(images[0]);

  return (
    <div className="flex gap-3">
      {/* Thumbnail Column */}
      <div className="flex flex-col gap-3">
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => setThumbnail(img)}
            className={`border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer transition-all ${
              thumbnail === img ? 'ring-2 ring-indigo-500' : ''
            }`}
          >
            <img 
              src={img} 
              alt={`Thumb ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
        <img
          src={thumbnail}
          alt="Selected product"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}