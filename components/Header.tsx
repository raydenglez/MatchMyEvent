
import React from 'react';
import { SearchBar } from './SearchBar';
import { GlobeIcon, MenuIcon, UserCircleIcon } from './icons/Icons';
import type { SearchQuery } from '../types';

interface HeaderProps {
  onSearch: (query: SearchQuery) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0.3"/>
                <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8 8-3.59-8-8-8zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-11h2v6h-2zm0 8h2v2h-2z" transform="rotate(45 12 12)"/>
                 <path d="M16.5 10.5h-2.5v-2.5c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v2.5H7.5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2.5v2.5c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.5h2.5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1z" />
              </svg>
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                MatchMyEvent
              </span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex justify-center flex-1 min-w-0 px-8">
             <SearchBar onSearch={onSearch} />
          </div>


          {/* Right side navigation */}
          <div className="flex items-center justify-end">
            <a href="#" className="hidden md:block text-sm font-semibold text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-full transition-colors">
              Become a Provider
            </a>
            <button className="hidden md:block p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <GlobeIcon />
            </button>
            <div className="flex items-center border border-gray-300 rounded-full p-2 ml-2 shadow-sm hover:shadow-md transition-shadow">
                <MenuIcon />
                <div className="ml-3">
                    <UserCircleIcon />
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
