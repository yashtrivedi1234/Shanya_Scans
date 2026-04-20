import React from 'react'

const PathologySkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-xl shadow-md p-4 animate-pulse">
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="mt-4 flex justify-between">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PathologySkeleton;
  
