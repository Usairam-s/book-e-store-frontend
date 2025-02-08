// components/SuccessCard.js
import React from "react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Thank You Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thanks for purchasing!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-8">
          Check your email to download the book
        </p>

        {/* Back Home Button */}
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg
                     hover:bg-primary-dark transition-colors duration-200 text-black"
        >
          Back Home
        </a>
      </div>
    </div>
  );
}
