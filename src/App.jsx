import { useEffect, useState, useRef } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapUpdater({ location }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.latitude, location.longitude], 13);
  }, [location, map]);
  return null;
}

function App() {
  const [count, setCount] = useState(0);
  const [washroomsLocations, setWashroomsLocations] = useState([]);
  const [location, setLocation] = useState({
    latitude: 53.631611,
    longitude: -113.323975,
  });

  const [error, setError] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    fetch('https://express-server-oktc.onrender.com/locations/alllocations')
      .then((response) => response.json())
      .then((data) => {
        setWashroomsLocations(data);
      });
    getLocation();
  }, []);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (mapRef.current) {
            mapRef.current.setView(
              [position.coords.latitude, position.coords.longitude],
              13
            );
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <>
      <h1>Welcome to Washroom Finder</h1>
      {/* Coordinates for Edmonton in MapContainer */}
      <MapContainer
        ref={mapRef}
        center={[location.latitude, location.longitude]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {washroomsLocations.map((washroom) => (
          <Marker
            key={washroom.id}
            position={[washroom.latitude, washroom.longitude]}
          >
            <Popup>{washroom.location_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default App;
