'use client';

import ProtectedRoute from '@/ProtectedRoute/ProtectedRoute';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function AddProduct() {
  const initialFormState = {
    userId: '',
    name: '',
    brand: '',
    description: '',
    price: '',
    offerPrice: '',
    rating: '',
    reviewCount: '',
    stock: '',
    warranty: '',
    connectivity: '',
    batteryLife: '',
    features: '',
    colorOptions: '',
    inTheBox: '',
    image: '',
    category: '',
    sku: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('dimensions.')) {
      const dimKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [dimKey]: value },
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.brand || !formData.price || !formData.stock) {
      toast.error('Please fill out all required fields (*)');
      setLoading(false);
      return;
    }

    const splitAndTrim = (str) =>
      str.split(',').map((item) => item.trim()).filter(Boolean);

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      offerPrice: parseFloat(formData.offerPrice) || 0,
      rating: parseFloat(formData.rating) || 0,
      reviewCount: parseInt(formData.reviewCount, 10) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      features: splitAndTrim(formData.features),
      colorOptions: splitAndTrim(formData.colorOptions),
      inTheBox: splitAndTrim(formData.inTheBox),
      image: splitAndTrim(formData.image),
      date: Date.now(),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Product added successfully!');
        setFormData(initialFormState);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to add product.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Toaster />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200">

          {/* User ID */}
          <div>
            <label className="block font-medium text-gray-700">User ID (optional)</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>

          {/* Name & Brand */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 textarea textarea-bordered w-full"
              rows={4}
            />
          </div>

          {/* Price & Offer Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Offer Price</label>
              <input
                type="number"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>

          {/* Stock & SKU */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>

          {/* Rating & Review Count */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Review Count</label>
              <input
                type="number"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>

          {/* Warranty, Connectivity, Battery Life, Weight */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Warranty</label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Connectivity</label>
              <input
                type="text"
                name="connectivity"
                value={formData.connectivity}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Battery Life</label>
              <input
                type="text"
                name="batteryLife"
                value={formData.batteryLife}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>

          {/* Features, Colors, In the Box, Images */}
          <div>
            <label className="block font-medium text-gray-700">Features (comma separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Colors (comma separated)</label>
            <input
              type="text"
              name="colorOptions"
              value={formData.colorOptions}
              onChange={handleChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">In the Box (comma separated)</label>
            <input
              type="text"
              name="inTheBox"
              value={formData.inTheBox}
              onChange={handleChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Image URLs (comma separated)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>

          {/* Dimensions */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Length</label>
              <input
                type="text"
                name="dimensions.length"
                value={formData.dimensions.length}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Width</label>
              <input
                type="text"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Height</label>
              <input
                type="text"
                name="dimensions.height"
                value={formData.dimensions.height}
                onChange={handleChange}
                className="mt-1 input input-bordered w-full"
              />
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="ml-2 text-gray-700">Active</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary mt-4 w-full"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
