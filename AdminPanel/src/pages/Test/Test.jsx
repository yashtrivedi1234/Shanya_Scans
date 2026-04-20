import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 📍 Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 📍 Marker that updates position
const SmoothMarker = ({ position }) => {
  const markerRef = useRef();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position); // smooth update
    }
  }, [position]);

  return (
    <Marker position={position} icon={customIcon} ref={markerRef}>
      <Popup>
        📍 Aapka current location<br />
        Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
      </Popup>
    </Marker>
  );
};

// 📍 Recenter map to current location
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), {
      animate: true,
      duration: 0.5,
    });
  }, [position, map]);
  return null;
};

const Test = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('📡 Updated Position:', latitude, longitude); // ✅ Debug
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error('❌ Location error:', err);
        alert('Failed to get your live location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="h-[500px] w-full">
      {position ? (
        <MapContainer center={position} zoom={18} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap position={position} />
          <SmoothMarker position={position} />
        </MapContainer>
      ) : (
        <div className="text-center text-gray-600 mt-4">📡 Locating you...</div>
      )}
    </div>
  );
};

export default Test;
