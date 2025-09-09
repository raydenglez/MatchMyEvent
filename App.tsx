import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterPills } from './components/FilterPills';
import { ListingGrid } from './components/ListingGrid';
import { Banner } from './components/Banner';
import { FilterModal } from './components/FilterModal';
import type { Listing, SearchQuery, FilterValues } from './types';
import { MOCK_LISTINGS } from './constants';

const INITIAL_FILTERS: FilterValues = {
  minPrice: '',
  maxPrice: '',
  minRating: 0,
  isTopPro: false,
  isInstantBookable: false,
};

const App: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    location: '',
    service: '',
    guests: '',
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>(INITIAL_FILTERS);

  useEffect(() => {
    // Simulate API call to fetch listings
    setIsLoading(true);
    const timer = setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (query: SearchQuery) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = (filters: FilterValues) => {
    setActiveFilters(filters);
    setIsFilterModalOpen(false);
  };

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Search Query Filtering
      const locationMatch =
        !searchQuery.location ||
        listing.location.toLowerCase().includes(searchQuery.location.toLowerCase());

      const serviceMatch =
        !searchQuery.service ||
        listing.title.toLowerCase().includes(searchQuery.service.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.service.toLowerCase());

      const guestsMatch =
        !searchQuery.guests ||
        !listing.maxGuests ||
        listing.maxGuests >= parseInt(searchQuery.guests, 10);

      // Advanced Filters
      const minPriceMatch =
        !activeFilters.minPrice || listing.price >= Number(activeFilters.minPrice);
      
      const maxPriceMatch =
        !activeFilters.maxPrice || listing.price <= Number(activeFilters.maxPrice);

      const ratingMatch = listing.review.rating >= activeFilters.minRating;

      const topProMatch = !activeFilters.isTopPro || listing.provider.isTopPro;

      const instantBookMatch = !activeFilters.isInstantBookable || listing.isInstantBookable;

      return (
        locationMatch &&
        serviceMatch &&
        guestsMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        ratingMatch &&
        topProMatch &&
        instantBookMatch
      );
    });
  }, [listings, searchQuery, activeFilters]);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterPills onAllFiltersClick={() => setIsFilterModalOpen(true)} />
        <div className="my-6">
          <Banner />
        </div>
        <ListingGrid listings={filteredListings} isLoading={isLoading} />
      </main>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
        listingsCount={filteredListings.length}
      />
    </div>
  );
};

export default App;