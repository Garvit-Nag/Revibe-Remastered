import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Search Bar Skeleton */}
      <div className="w-full h-12 bg-gray-800 rounded-lg animate-pulse" />
      
      {/* Selected Song Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
        <div className="p-4 bg-gray-800 rounded-lg h-48 animate-pulse" />
      </div>
      
      {/* Recommendations Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg h-64 animate-pulse"
            />
          ))}
        </div>
      </div>
      
      {/* Popular Songs Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg h-64 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;