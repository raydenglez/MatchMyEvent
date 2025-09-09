import React from 'react';
import type { Listing } from '../types';
import { ListingCard } from './ListingCard';
import { ListingCardSkeleton } from './ListingCardSkeleton';
import { SearchIcon } from './icons/Icons';

interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
}

export const ListingGrid: React.FC<ListingGridProps> = ({ listings, isLoading }) => {
  const skeletonCount = 8;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ListingCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-gray-500 mb-4">
          <SearchIcon />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">No results found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};