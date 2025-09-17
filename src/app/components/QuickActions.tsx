import React from 'react';

const QuickActions: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 space-y-2">
      {/* My Favourites */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-48">
        <span className="text-yellow-400 text-xl">⭐</span>
        <span className="font-medium">My Favourites</span>
      </div>
      
      {/* My Profile */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-48">
        <span className="text-green-400 text-xl">👤</span>
        <span className="font-medium">My Profile</span>
      </div>
      
      {/* Charge Sessions */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-48">
        <span className="text-green-400 text-xl">🔋</span>
        <span className="font-medium">Charge Sessions</span>
      </div>
      
      {/* Statistics */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-48">
        <span className="text-blue-400 text-xl">📊</span>
        <span className="font-medium">Statistics</span>
      </div>
    </div>
  );
};

export default QuickActions;
