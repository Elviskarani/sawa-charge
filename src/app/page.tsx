"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../app/components/Sidebar';
import Header from '../app/components/Header';
import MapView from '../app/components/MapView';
import QuickActions from '../app/components/QuickActions';
import InstallPrompt from '../app/components/InstallPrompt';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Map and Quick Actions Container */}
        <div className="flex-1 relative">
          {/* Map Component */}
          <MapView />
        </div>
      </div>
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
