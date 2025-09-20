"use client";

import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  return (
    <div className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        
        {/* View Toggle */}
        <div className="flex space-x-1">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-2 rounded text-sm font-medium ${
              viewMode === 'map'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            List
          </button>
        </div>
      </div>
      
      {/* Greeting */}
      <div className="text-green-600 font-medium hidden sm:block">
        Good Afternoon
      </div>
    </div>
  );
};

export default Header;