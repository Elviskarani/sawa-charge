"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Zap, Filter, X } from 'lucide-react';
import evLocationsData from '../../evlocation.json';

interface Charger {
  type: string;
  connector_type: string;
  charging_speed_kw: string;
  availability: string;
}

interface EVLocation {
  operator: string;
  name: string;
  location: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  chargers: Charger[];
}

interface FilterState {
  speed: string;
  connectorType: string;
  operator: string;
}

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    speed: '',
    connectorType: '',
    operator: ''
  });

  const evLocations: EVLocation[] = evLocationsData.ev_charging_locations;

  // Get unique values for filter options
  const getFilterOptions = () => {
    const speeds = new Set<string>();
    const connectorTypes = new Set<string>();
    const operators = new Set<string>();

    evLocations.forEach(location => {
      operators.add(location.operator);
      location.chargers.forEach(charger => {
        speeds.add(charger.charging_speed_kw);
        // Split connector types that may be comma-separated
        charger.connector_type.split(',').forEach(type => {
          connectorTypes.add(type.trim());
        });
      });
    });

    return {
      speeds: Array.from(speeds).sort(),
      connectorTypes: Array.from(connectorTypes).sort(),
      operators: Array.from(operators).sort()
    };
  };

  const filterOptions = getFilterOptions();

  const filteredLocations = evLocations.filter(location => {
    if (filters.operator && location.operator !== filters.operator) {
      return false;
    }

    const hasMatchingCharger = location.chargers.some(charger => {
      if (filters.speed && charger.charging_speed_kw !== filters.speed) {
        return false;
      }
      if (filters.connectorType && !charger.connector_type.includes(filters.connectorType)) {
        return false;
      }
      return true;
    });

    return hasMatchingCharger;
  });

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
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            restriction: {
              latLngBounds: {
                north: 5.0,
                south: -4.7,
                east: 42.0,
                west: 33.9
              },
              strictBounds: false
            },
            minZoom: 5,
            styles: [
              {
                featureType: 'administrative.country',
                elementType: 'geometry.stroke',
                stylers: [
                  { color: '#10B981' },
                  { weight: 2 }
                ]
              }
            ],
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true
          });

          // Add charging station markers
          addChargingStationMarkers(mapInstanceRef.current);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key.');
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when filters change
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Add filtered markers
      addChargingStationMarkers(mapInstanceRef.current);
    }
  }, [filters]);

  const createChargingIcon = () => {
    // Create a custom SVG icon using Lucide Zap icon path
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#10B981" stroke="#ffffff" stroke-width="2"/>
        <path d="m13 2-3 7h4l-3 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    `;

    return {
      url: 'data:image/svg+xml;base64,' + btoa(svgIcon),
      scaledSize: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 32)
    };
  };

  const addChargingStationMarkers = (map: google.maps.Map) => {
    const chargingIcon = createChargingIcon();

    filteredLocations.forEach((station) => {
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(station.coordinates.latitude),
          lng: parseFloat(station.coordinates.longitude)
        },
        map: map,
        title: station.name,
        icon: chargingIcon
      });

      // Create detailed info window content
      const chargersInfo = station.chargers.map(charger => `
        <div style="border-left: 3px solid #10B981; padding-left: 8px; margin: 4px 0;">
          <div style="font-weight: 600; color: #374151;">${charger.type} - ${charger.charging_speed_kw}</div>
          <div style="font-size: 12px; color: #6B7280;">Connector: ${charger.connector_type}</div>
          <div style="font-size: 12px; color: #6B7280;">Access: ${charger.availability}</div>
        </div>
      `).join('');

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 300px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #111827;">${station.name}</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #6B7280;">${station.location}</p>
            <p style="margin: 0 0 12px 0; font-size: 12px; color: #9CA3AF; font-weight: 500;">Operator: ${station.operator}</p>
            <div style="border-top: 1px solid #E5E7EB; padding-top: 8px;">
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 6px; color: #374151;">Available Chargers:</div>
              ${chargersInfo}
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      speed: '',
      connectorType: '',
      operator: ''
    });
  };

  const hasActiveFilters = filters.speed || filters.connectorType || filters.operator;

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
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg font-medium transition-colors ${
            hasActiveFilters 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter size={16} />
          Filter Stations
          {hasActiveFilters && (
            <span className="bg-white text-green-600 text-xs px-2 py-1 rounded-full font-bold">
              {filteredLocations.length}
            </span>
          )}
        </button>

        {showFilters && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Charging Stations</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Operator Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator
                </label>
                <select
                  value={filters.operator}
                  onChange={(e) => handleFilterChange('operator', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Operators</option>
                  {filterOptions.operators.map(operator => (
                    <option key={operator} value={operator}>{operator}</option>
                  ))}
                </select>
              </div>

              {/* Charging Speed Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charging Speed
                </label>
                <select
                  value={filters.speed}
                  onChange={(e) => handleFilterChange('speed', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Speeds</option>
                  {filterOptions.speeds.map(speed => (
                    <option key={speed} value={speed}>{speed}</option>
                  ))}
                </select>
              </div>

              {/* Connector Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Connector Type
                </label>
                <select
                  value={filters.connectorType}
                  onChange={(e) => handleFilterChange('connectorType', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Connector Types</option>
                  {filterOptions.connectorTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

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
      
      {/* Legend */}
      {!isLoading && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
          <div className="text-sm font-semibold mb-2">Legend</div>
          <div className="flex items-center text-xs mb-2">
            <Zap className="w-4 h-4 text-green-500 mr-2" />
            <span>EV Charging Stations</span>
          </div>
          <div className="text-xs text-gray-500 border-t pt-2">
            Showing {filteredLocations.length} of {evLocations.length} stations
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;