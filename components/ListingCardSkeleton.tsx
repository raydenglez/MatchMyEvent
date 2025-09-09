
import React from 'react';

export const ListingCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-[4/3] rounded-2xl bg-gray-300"></div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
    </div>
  );
};
