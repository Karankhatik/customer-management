import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found!</h1>
      <p className="text-lg text-gray-600">
        Oops! The page you're looking for could not be found.
      </p>
      <img
        src="/path/to/your/error/image.png"
        alt="404 Not Found"
        className="mt-8 max-w-sm"
      />
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </a>
    </div>
  );
}
