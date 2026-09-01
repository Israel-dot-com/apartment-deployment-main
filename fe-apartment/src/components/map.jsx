import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Map = ({ location, propertyType, propertyId }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const initializationRef = useRef(false);

  // Debug function to log steps
  const addDebugInfo = useCallback((info) => {
    console.log(info);
    setDebugInfo(prev => prev + '\n' + info);
  }, []);

  // Function to geocode location string to coordinates
  const geocodeLocation = useCallback(async (locationString) => {
    try {
      addDebugInfo(`Starting geocoding for: ${locationString}`);
      const geocoder = new window.google.maps.Geocoder();
      
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: locationString }, (results, status) => {
          addDebugInfo(`Geocoding status: ${status}`);
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            const coords = {
              lat: location.lat(),
              lng: location.lng(),
              formatted_address: results[0].formatted_address
            };
            addDebugInfo(`Geocoding successful: ${JSON.stringify(coords)}`);
            resolve(coords);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
    } catch (error) {
      addDebugInfo(`Geocoding error: ${error.message}`);
      throw error;
    }
  }, [addDebugInfo]);

  // Initialize map
  const initializeMap = useCallback(async () => {
    try {
      if (initializationRef.current) {
        addDebugInfo('Initialization already in progress, skipping...');
        return;
      }
      
      initializationRef.current = true;
      addDebugInfo('=== Starting map initialization ===');

      if (!isComponentMounted) {
        addDebugInfo('Component not mounted, aborting initialization');
        initializationRef.current = false;
        return;
      }

      // Check if Google Maps API is loaded
      if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
        throw new Error('Google Maps API not fully loaded');
      }
      addDebugInfo('✓ Google Maps API confirmed loaded');

      // Wait for DOM element to be available
      let attempts = 0;
      const maxAttempts = 50;
      
      while (!mapRef.current && attempts < maxAttempts) {
        addDebugInfo(`Waiting for mapRef: attempt ${attempts + 1}`);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (!mapRef.current) {
        throw new Error('Map container ref never became available');
      }
      
      addDebugInfo('✓ Map container ref is available');

      // Geocode the location
      addDebugInfo(`Attempting to geocode location: ${location}`);
      const coordinates = await geocodeLocation(location);

      if (!isComponentMounted || !mapRef.current) {
        throw new Error('Component or ref became unavailable before map creation');
      }

      // Create map instance
      addDebugInfo('Creating map instance...');
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
      });

      addDebugInfo('✓ Map instance created successfully');

// Create custom marker - Using house icon
      const markerInstance = new window.google.maps.Marker({
        position: coordinates,
        map: mapInstance,
        title: `${propertyType} - ${location}`,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(8, 8)">
                <path d="M12 2l10 9h-3v8h-4v-6h-6v6h-4v-8h-3l10-9z" fill="#2563EB" stroke="white" stroke-width="1"/>
                <circle cx="12" cy="2" r="2" fill="#EF4444"/>
              </g>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 32)
        }
      });
      addDebugInfo('✓ Marker created successfully');

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #333;">${propertyType}</h3>
            <p style="margin: 0; color: #666;">📍 ${coordinates.formatted_address}</p>
          </div>
        `
      });

      // Add click listener to marker
      markerInstance.addListener('click', () => {
        infoWindow.open(mapInstance, markerInstance);
      });

      // Only update state if still mounted
      if (isComponentMounted) {
        setMap(mapInstance);
        setMarker(markerInstance);
        setLoading(false);
        addDebugInfo('✓ Map initialization completed successfully');
      }

    } catch (error) {
      console.error('Error initializing map:', error);
      addDebugInfo(`❌ Error: ${error.message}`);
      if (isComponentMounted) {
        setError(error.message);
        setLoading(false);
      }
    } finally {
      initializationRef.current = false;
    }
  }, [location, propertyType, addDebugInfo, geocodeLocation, isComponentMounted]);

  // Load Google Maps API
  const loadGoogleMapsAPI = useCallback(() => {
    return new Promise((resolve, reject) => {
      addDebugInfo('=== Loading Google Maps API ===');
      
      // Check if Google Maps API is fully loaded
      const isGoogleMapsFullyLoaded = () => {
        return window.google && 
               window.google.maps && 
               window.google.maps.Map && 
               window.google.maps.Marker &&
               window.google.maps.Geocoder &&
               window.google.maps.InfoWindow;
      };
      
      if (isGoogleMapsFullyLoaded()) {
        addDebugInfo('✓ Google Maps already loaded');
        resolve();
        return;
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        addDebugInfo('Google Maps script already exists, waiting for load...');
        
        let attempts = 0;
        const maxAttempts = 60;
        
        const checkInterval = setInterval(() => {
          attempts++;
          if (isGoogleMapsFullyLoaded()) {
            addDebugInfo('✓ Google Maps loaded via existing script');
            clearInterval(checkInterval);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            reject(new Error('Timeout waiting for Google Maps to load'));
          }
        }, 500);
        return;
      }

      const script = document.createElement('script');
      const apiKey = 'AIzaSyBDe41bo4qBdTFQwvcRJjOP5sih4VOgEEM';
      
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,places&loading=async`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        addDebugInfo('✓ Google Maps script loaded successfully');
        
        // Wait for API to be fully available
        let attempts = 0;
        const maxAttempts = 30;
        
        const checkApiReady = setInterval(() => {
          attempts++;
          if (isGoogleMapsFullyLoaded()) {
            addDebugInfo('✓ Google Maps API fully initialized');
            clearInterval(checkApiReady);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkApiReady);
            reject(new Error('Google Maps API not fully available after script load'));
          }
        }, 100);
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API - please check your API key'));
      };

      document.head.appendChild(script);
    });
  }, [addDebugInfo]);

  // Component mount effect
  useEffect(() => {
    setIsComponentMounted(true);
    addDebugInfo('Component mounted');
    
    return () => {
      addDebugInfo('Component unmounting');
      setIsComponentMounted(false);
      initializationRef.current = false;
    };
  }, [addDebugInfo]);

  // Main initialization effect
  useEffect(() => {
    if (!location || !isComponentMounted) {
      if (!location) {
        setError('No location provided');
        setLoading(false);
      }
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (!isComponentMounted) return;
      
      try {
        await loadGoogleMapsAPI();
        if (!isComponentMounted) return;
        
        await initializeMap();
        
      } catch (error) {
        console.error('Map initialization flow failed:', error);
        addDebugInfo(`❌ Flow error: ${error.message}`);
        if (isComponentMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };

  }, [location, isComponentMounted, loadGoogleMapsAPI, initializeMap, addDebugInfo]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (map) {
        window.google?.maps?.event?.clearInstanceListeners?.(map);
      }
    };
  }, [marker, map]);

  // Handle directions
  const handleGetDirections = () => {
    if (location) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
      window.open(url, '_blank');
    }
  };

  // Retry function
  const handleRetry = () => {
    addDebugInfo('=== RETRY INITIATED ===');
    setError(null);
    setLoading(true);
    setDebugInfo('');
    initializationRef.current = false;
    
    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }
    if (map) {
      setMap(null);
    }
    
    setTimeout(async () => {
      if (!isComponentMounted) return;
      
      try {
        await loadGoogleMapsAPI();
        if (!isComponentMounted) return;
        
        await initializeMap();
      } catch (error) {
        console.error('Retry failed:', error);
        addDebugInfo(`❌ Retry error: ${error.message}`);
        if (isComponentMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    }, 200);
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      {/* Header */}


      {/* Map Container - ALWAYS RENDERED */}
      <div className="relative h-full">
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ 
            minHeight: "650px",
            height: "650px",
            backgroundColor: '#f3f4f6' 
          }}
        />
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-90 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading map...</h3>
              <div className="text-sm text-gray-600 mb-4">
                Preparing your location view...
              </div>
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Debug Info
                </summary>
                <pre className="text-xs bg-gray-50 p-2 rounded mt-2 max-h-40 overflow-auto">
                  {debugInfo}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 bg-red-50 bg-opacity-90 flex flex-col items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load map</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mb-4"
              >
                Retry
              </button>
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-red-500 hover:text-red-700">
                  Debug Info
                </summary>
                <pre className="text-xs bg-red-100 p-2 rounded mt-2 max-h-40 overflow-auto">
                  {debugInfo}
                </pre>
              </details>
            </div>
          </div>
        )}
        
        {/* Location info overlay - only show when map is loaded */}

      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 p-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          📍 Exact location will be provided after booking confirmation
        </p>
      </div>
    </div>
  );
};

export default Map;