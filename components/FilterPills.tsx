import React from 'react';
import { Category } from '../types';
import { AdjustmentsHorizontalIcon, BoltIcon } from './icons/Icons';

const filters = [
  ...Object.values(Category),
];

interface FilterPillsProps {
    onAllFiltersClick: () => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({ onAllFiltersClick }) => {
  return (
    <div className="py-4 flex items-center space-x-2 overflow-x-auto">
      {/* These pills are for demonstration and can be made functional */}
      <button className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border bg-gray-800 text-white border-gray-800">
        All
      </button>
      {filters.map((filter) => (
        <button
          key={filter}
          className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
        >
          {filter}
        </button>
      ))}
      <div className="flex-grow"></div>
       <button 
        onClick={onAllFiltersClick}
        className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400"
       >
        <AdjustmentsHorizontalIcon/>
        <span>All Filters</span>
       </button>
    </div>
  );
};