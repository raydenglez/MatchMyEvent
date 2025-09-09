
import React from 'react';
import type { Listing } from '../types';
import { StarIcon, HeartIcon, VerifiedIcon, BoltIcon } from './icons/Icons';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 text-white p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          <HeartIcon />
        </button>
        {listing.provider.isTopPro && (
          <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-md">
            <VerifiedIcon />
            <span className="ml-1">Top Pro</span>
          </div>
        )}
         {listing.isInstantBookable && (
          <div className="absolute bottom-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-md">
            <BoltIcon />
            <span className="ml-1">Instant Book</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 text-base leading-tight pr-2">
            {listing.title}
          </h3>
          <div className="flex-shrink-0 flex items-center space-x-1">
            <StarIcon />
            <span className="text-sm text-gray-600">{listing.review.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
        <p className="text-sm text-gray-500">{listing.category}</p>
        <p className="mt-2">
          <span className="font-bold text-gray-800">${listing.price}</span>
          <span className="text-sm text-gray-600"> / {listing.priceUnit}</span>
        </p>
      </div>
    </div>
  );
};
