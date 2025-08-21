'use client';
import React, { useState } from 'react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="bg-white text-gray-500 max-w-96 mx-auto mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create an Account</h2>
        <form>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">
              Full Name
            </label>
            <input
              id="name"
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 relative">
            <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Confirm Password */}
         

          <button type="submit" className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>

        {/* Social buttons */}
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
            alt="appleLogo"
          />
          Sign up with Apple
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
