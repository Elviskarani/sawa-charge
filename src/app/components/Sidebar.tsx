import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { HandFist } from 'lucide-react';
import { Store } from 'lucide-react';
import { EarthLock } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 bg-[#272D3C] text-white flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">SawaCharge</span>
          <span className="text-sm text-gray-300">Africa</span>
        </div>
      </div>
      
      {/* Login/Register Buttons */}
     
      
      {/* App Section */}
      <div className="px-4 mb-6">
        <h3 className="text-green-400 text-sm font-semibold mb-3">App</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/map" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <MapPin color="#c1ff72" size={24} />
              <span>View Map</span>
            </Link>
          </li>
          
        </ul>
      </div>
      
      {/* About Us Section */}
      <div className="px-4 mb-6">
        <h3 className="text-green-400 text-sm font-semibold mb-3">About Us</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/support" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <HandFist color="#c1ff72" size={24} />
              <span>Support Or FAQ</span>
            </Link>
          </li>
         
          <li>
            <Link href="/about" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <Store color="#c1ff72" size={24} />
              <span>About sawacharge</span>
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <EarthLock color="#c1ff72" size={24} />
              <span>Privacy Policy</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Other Services Section */}
      <div className="px-4 mt-auto pb-4">
        <h3 className="text-green-400 text-sm font-semibold mb-3">Other Services</h3>
        <div className="space-y-3">
          <div className="bg-orange-600 p-2 rounded">
            <div className="text-white font-bold text-sm">CAR</div>
            <div className="text-white font-bold text-sm">MARKETPLACE</div>
          </div>
          <div className="bg-green-600 p-2 rounded">
            <div className="text-white text-sm">BUY AN EV</div>
          </div>
          <div className="bg-blue-600 p-2 rounded">
            <div className="text-white text-sm">SELL YOUR CAR</div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;