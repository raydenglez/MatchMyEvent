import React, { useState, useEffect } from 'react';
import type { FilterValues } from '../types';
import { XMarkIcon, StarIcon, BoltIcon, VerifiedIcon } from './icons/Icons';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  initialFilters: FilterValues;
  listingsCount: number;
}

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];
const MIN_PRICE = 0;
const MAX_PRICE = 5000;
const PRICE_STEP = 10;

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialFilters,
  listingsCount,
}) => {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  useEffect(() => {
    if (isOpen) {
      setFilters({
        ...initialFilters,
        minPrice: initialFilters.minPrice || MIN_PRICE,
        maxPrice: initialFilters.maxPrice || MAX_PRICE,
      });
    }
  }, [initialFilters, isOpen]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleClear = () => {
    setFilters({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      minRating: 0,
      isTopPro: false,
      isInstantBookable: false,
    });
  };

  const handleApply = () => {
    const filtersToApply = { ...filters };
    // If the price range is still the default max range, pass empty strings to signal "no filter".
    if (Number(filters.minPrice) === MIN_PRICE && Number(filters.maxPrice) === MAX_PRICE) {
      filtersToApply.minPrice = '';
      filtersToApply.maxPrice = '';
    }
    onApply(filtersToApply);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleRatingClick = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating,
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close filters"
          >
            <XMarkIcon />
          </button>
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="w-10"></div> {/* Spacer */}
        </header>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Price Range */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Price range</h3>
             <div className="text-center text-lg font-medium text-gray-700 mb-6">
                ${Number(filters.minPrice).toLocaleString()} - ${Number(filters.maxPrice) === MAX_PRICE ? `${Number(MAX_PRICE).toLocaleString()}+` : Number(filters.maxPrice).toLocaleString()}
            </div>
            <div className="relative h-12 flex items-center justify-center">
                <div className="relative w-full h-1 bg-gray-200 rounded-full">
                    <div
                        className="absolute h-1 bg-purple-600 rounded-full"
                        style={{
                            left: `${(Number(filters.minPrice) / MAX_PRICE) * 100}%`,
                            right: `${100 - (Number(filters.maxPrice) / MAX_PRICE) * 100}%`,
                        }}
                    />
                </div>
                <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={PRICE_STEP}
                    value={filters.minPrice}
                    onChange={(e) => {
                        const value = Math.min(Number(e.target.value), Number(filters.maxPrice) - PRICE_STEP);
                        setFilters(prev => ({ ...prev, minPrice: value }));
                    }}
                    className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                    aria-label="Minimum price"
                />
                <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={PRICE_STEP}
                    value={filters.maxPrice}
                    onChange={(e) => {
                        const value = Math.max(Number(e.target.value), Number(filters.minPrice) + PRICE_STEP);
                        setFilters(prev => ({ ...prev, maxPrice: value }));
                    }}
                    className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                    aria-label="Maximum price"
                />
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          {/* Rating */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Rating</h3>
            <p className="text-gray-500 mb-4 text-sm">Show only listings with this rating or higher</p>
            <div className="flex items-center space-x-2">
              {RATING_OPTIONS.map(rating => (
                 <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className={`px-6 py-3 rounded-lg border text-sm font-semibold transition-colors ${
                        filters.minRating === rating
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                    }`}
                >
                  {rating.toFixed(1)} <span className="text-yellow-500">★</span>+
                </button>
              ))}
            </div>
          </section>
          
          <div className="border-t border-gray-200"></div>

          {/* Provider Options */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Provider options</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="font-medium">Top Pro</h4>
                  <p className="text-sm text-gray-500">Highly-rated and experienced providers.</p>
                </div>
                <input
                  type="checkbox"
                  name="isTopPro"
                  checked={filters.isTopPro}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
               <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="font-medium">Instant Book</h4>
                  <p className="text-sm text-gray-500">Book without waiting for provider approval.</p>
                </div>
                <input
                  type="checkbox"
                  name="isInstantBookable"
                  checked={filters.isInstantBookable}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between p-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={handleClear}
            className="text-sm font-semibold underline px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Show {listingsCount} listings
          </button>
        </footer>
      </div>
    </div>
  );
};