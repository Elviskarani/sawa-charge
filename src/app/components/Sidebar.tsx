import React from 'react';
import Link from 'next/link';
import { MapPin, HandFist, Store, EarthLock, X } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div className="w-72 bg-white text- flex flex-col h-full">
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">SawaCharge</span>
            <span className="text-sm text-green-600 font-bold">Africa</span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-300 hover:text-white hover:bg-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Login/Register Buttons */}
     
      
      {/* App Section */}
      
      {/* About Us Section */}
      <div className="px-4 mb-6">
        <h3 className="text-green-400 text-sm font-semibold mb-3">About Us</h3>
        <ul className="space-y-2">
          <li>
            <Link href="https://www.carsawa.africa/" className="flex items-center space-x-3 text-gray-600 font-bold hover:text-white">
            <HandFist color="green" size={24} />
              <span>Support Or FAQ</span>
            </Link>
          </li>
         
          <li>
            <Link href="https://blog.carsawa.africa/about" className="flex items-center space-x-3 text-gray-600 font-bold hover:text-white">
            <Store color="green" size={24} />
              <span>About sawacharge</span>
            </Link>
          </li>
          <li>
            <Link href="https://www.carsawa.africa/" className="flex items-center space-x-3 text-gray-600 font-bold hover:text-white">
            <EarthLock color="green" size={24} />
              <span>Privacy Policy</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Other Services Section */}
      <div className="px-4 mt-auto pb-4">
        <h3 className="text-green-400 text-sm font-semibold mb-3">Other Services</h3>
        <div className="space-y-3">
          <Link href="https://www.carsawa.africa" target="_blank" rel="noopener noreferrer" className="block bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors">
            <div className="text-white font-bold text-sm">CAR</div>
            <div className="text-white font-bold text-sm">MARKETPLACE</div>
          </Link>
          <Link href="https://www.carsawa.africa" target="_blank" rel="noopener noreferrer" className="block bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors">
            <div className="text-white text-sm">BUY AN EV</div>
          </Link>
          <Link href="https://www.carsawa.africa" target="_blank" rel="noopener noreferrer" className="block bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors">
            <div className="text-white text-sm">SELL YOUR CAR</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;