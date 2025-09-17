"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();

        if (mapRef.current && !mapInstanceRef.current) {
          // Kenya coordinates - centered on Nairobi
          const kenyaCenter = { lat: -1.286389, lng: 36.817223 };
          
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center: kenyaCenter,
            zoom: 6, // Good zoom level to show most of Kenya
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            restriction: {
              // Restrict the map to Kenya's approximate bounds
              latLngBounds: {
                north: 5.0, // Northern border (around Ethiopia/Sudan)
                south: -4.7, // Southern border (around Tanzania)
                east: 42.0, // Eastern border (Indian Ocean)
                west: 33.9  // Western border (around Uganda)
              },
              strictBounds: false // Allow some padding
            },
            minZoom: 5, // Prevent zooming out too far
            styles: [
              // Optional: Custom styling to highlight Kenya
              {
                featureType: 'administrative.country',
                elementType: 'geometry.stroke',
                stylers: [
                  { color: '#ff0000' },
                  { weight: 2 }
                ]
              }
            ],
            // UI controls
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true
          });

          // Add some sample charging station markers for Kenya
          addSampleChargingStations(mapInstanceRef.current);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key.');
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up if needed
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const addSampleChargingStations = (map: google.maps.Map) => {
    // Sample EV charging station locations in Kenya
    const chargingStations = [
      {
        position: { lat: -1.286389, lng: 36.817223 },
        title: 'Nairobi CBD Charging Station',
        info: 'Fast charging available 24/7'
      },
      {
        position: { lat: -4.043477, lng: 39.658871 },
        title: 'Mombasa Port Charging Hub',
        info: 'Multiple charging points'
      },
      {
        position: { lat: -0.091702, lng: 34.767956 },
        title: 'Kisumu Charging Station',
        info: 'Standard charging'
      },
      {
        position: { lat: 0.516667, lng: 35.283333 },
        title: 'Eldoret Charging Point',
        info: 'Highway charging station'
      },
      {
        position: { lat: -0.420833, lng: 36.955833 },
        title: 'Nakuru Charging Hub',
        info: 'Shopping mall location'
      }
    ];

    // Create custom marker icon for charging stations
    const chargingIcon = {
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V16C19 17.1 18.1 18 17 18H7C5.9 18 5 17.1 5 16V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V16H17V6H7Z" fill="#10B981"/>
          <circle cx="12" cy="11" r="2" fill="#10B981"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 32)
    };

    chargingStations.forEach((station) => {
      const marker = new google.maps.Marker({
        position: station.position,
        map: map,
        title: station.title,
        icon: chargingIcon
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${station.title}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">${station.info}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <div className="text-red-600 text-lg font-semibold mb-2">Map Error</div>
          <div className="text-red-500 text-sm">{error}</div>
          <div className="text-xs text-gray-500 mt-2">
            Make sure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set correctly
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-blue-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-blue-600 text-lg font-semibold mb-2">Loading Map...</div>
            <div className="text-blue-500 text-sm">Setting up Kenya EV charging stations</div>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      
      {/* Legend for charging stations */}
      {!isLoading && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
          <div className="text-sm font-semibold mb-2">Legend</div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>EV Charging Stations</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;