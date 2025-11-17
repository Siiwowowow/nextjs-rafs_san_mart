'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import BuyNowButton from '@/app/components/BuyNowButton'
import ProtectedRoute from '@/ProtectedRoute/ProtectedRoute'

export default function Detailspage() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg p-4">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {product.price && (
              <div className="text-2xl font-semibold text-green-600">
                ${product.price}
              </div>
            )}

            {product.description && (
              <div className="text-gray-700 leading-relaxed">
                {product.description}
              </div>
            )}

            {product.category && (
              <div className="text-sm text-gray-500">
                Category: {product.category}
              </div>
            )}

            {product.stock !== undefined && (
              <div className="text-sm text-gray-500">
                Stock: {product.stock} units
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="flex items-center mt-10 gap-4 text-base">
              <Link href={`/checkout/${product._id}`}>
                <button className="w-56 py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                  Add to Cart
                </button>
              </Link>
           <ProtectedRoute>
              <BuyNowButton product={product} />
           </ProtectedRoute>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
