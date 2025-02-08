// components/ErrorPayment.tsx
import React from "react";

export default function ErrorPayment() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Message */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>

        {/* Reassurance Text */}
        <p className="text-gray-500 mb-8">
          Don't worry you won't be charged, please try again
        </p>

        {/* Back Home Button */}
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg
                     hover:bg-primary-dark transition-colors duration-200"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
