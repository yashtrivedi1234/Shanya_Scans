import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
  lat: 26.8625831,
  lng: 80.9995918,
};
const GOOGLE_MAPS_API_KEY = "AIzaSyC9ZOZHwHmyTWXqACqpZY2TL7wX2_Zn05U"; // Add your API Key

export default function LiveLocationMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [path, setPath] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPath((prevPath) => [...prevPath, { lat: latitude, lng: longitude }]);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isLoaded) return <div className="text-center">Loading Map...</div>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Live Salesperson Location</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={path[path.length - 1] || center}
        zoom={15}
      >
        {path.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}
        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      </GoogleMap>
    </div>
  );
}
