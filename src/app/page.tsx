import Sidebar from '../app/components/Sidebar';
import Header from '../app/components/Header';
import MapView from '../app/components/MapView';
import QuickActions from '../app/components/QuickActions';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar />
    
    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Map and Quick Actions Container */}
      <div className="flex-1 relative">
        {/* Map Component */}
        <MapView />
        
       
      </div>
    </div>
  </div>
  );
}
