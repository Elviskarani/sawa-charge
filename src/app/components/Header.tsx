"use client";

import React, { useState } from 'react';

const Header: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  return (
    <div className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
      {/* View Toggle */}
      <div className="flex space-x-1">
        <button
          onClick={() => setViewMode('map')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            viewMode === 'map'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Map
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            viewMode === 'list'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          List
        </button>
      </div>
      
      {/* Greeting */}
      <div className="text-green-600 font-medium">
        Good Afternoon
      </div>
      
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="KEXXXXXXX Place,Postcode"
            className="pl-4 pr-10 py-2 border rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <span className="text-gray-400">🔍</span>
          </button>
        </div>
        
        <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 flex items-center space-x-2">
          <span>Filter</span>
          <span>▼</span>
        </button>
      </div>
    </div>
  );
};

export default Header;