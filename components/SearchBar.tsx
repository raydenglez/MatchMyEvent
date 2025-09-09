
import React, { useState } from 'react';
import { SearchIcon } from './icons/Icons';
import type { SearchQuery } from '../types';

interface SearchBarProps {
    onSearch: (query: SearchQuery) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [service, setService] = useState('');
    const [guests, setGuests] = useState('');

    const handleSearch = () => {
        onSearch({
            location,
            service,
            guests,
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center">
            
            {/* Where */}
            <div className="flex-1 min-w-0 pl-6 pr-3 py-2">
                <label htmlFor="location-search" className="block text-xs font-bold text-gray-800">Where</label>
                <input 
                    id="location-search" 
                    type="text" 
                    placeholder="Search destinations" 
                    className="w-full text-sm placeholder-gray-500 text-gray-800 focus:outline-none bg-transparent focus:ring-0 focus:ring-purple-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="w-px h-8 bg-gray-200"></div>
            
            {/* Check in */}
            <div className="flex-1 min-w-0 px-4 py-2">
                <label htmlFor="start-date-search" className="block text-xs font-bold text-gray-800">Check in</label>
                <input 
                    id="start-date-search" 
                    type="text" 
                    placeholder="Add dates" 
                    className="w-full text-sm placeholder-gray-500 text-gray-800 focus:outline-none bg-transparent appearance-none focus:ring-0 focus:ring-purple-500" 
                    onFocus={(e) => (e.target.type = 'date')} 
                    onBlur={(e) => { if (!e.target.value) { e.target.type = 'text'; } }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            <div className="w-px h-8 bg-gray-200"></div>

            {/* Check out */}
             <div className="flex-1 min-w-0 px-4 py-2">
                <label htmlFor="end-date-search" className="block text-xs font-bold text-gray-800">Check out</label>
                <input 
                    id="end-date-search" 
                    type="text" 
                    placeholder="Add dates" 
                    className="w-full text-sm placeholder-gray-500 text-gray-800 focus:outline-none bg-transparent appearance-none focus:ring-0 focus:ring-purple-500" 
                    onFocus={(e) => (e.target.type = 'date')} 
                    onBlur={(e) => { if (!e.target.value) { e.target.type = 'text'; } }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="w-px h-8 bg-gray-200"></div>

            {/* What */}
            <div className="flex-1 min-w-0 px-4 py-2">
                <label htmlFor="what-search" className="block text-xs font-bold text-gray-800">What</label>
                <input 
                    id="what-search" 
                    type="text" 
                    placeholder="Search services" 
                    className="w-full text-sm placeholder-gray-500 text-gray-800 focus:outline-none bg-transparent focus:ring-0 focus:ring-purple-500"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            <div className="w-px h-8 bg-gray-200"></div>

            {/* Who & Search Button */}
            <div className="flex items-center pl-4 pr-1.5 py-2">
                <div className="flex-1 min-w-0">
                    <label htmlFor="guests-search" className="block text-xs font-bold text-gray-800">Who</label>
                    <input 
                        id="guests-search" 
                        type="number" 
                        placeholder="Add guests" 
                        className="w-full text-sm placeholder-gray-500 text-gray-800 focus:outline-none bg-transparent focus:ring-0 focus:ring-purple-500"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button 
                    aria-label="Search" 
                    className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 ml-4 transition-colors"
                    onClick={handleSearch}
                >
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}