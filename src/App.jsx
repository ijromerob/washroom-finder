import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [count, setCount] = useState(0);
  const [washroomsLocations, setWashroomsLocations] = useState([]);

  useEffect(() => {
    fetch('https://express-server-oktc.onrender.com/locations/alllocations')
      .then((response) => response.json())
      .then((data) => {
        setWashroomsLocations(data);
      });
  }, []);

  // Test markers
  const markers = [
    {
      geocode: [48.86, 51.13],
      popUp: "This is a washroom's location",
    },
    {
      geocode: [48.96, 51.13],
      popUp: "This is a washroom's location",
    },
    {
      geocode: [48.86, 51.23],
      popUp: "This is a washroom's location",
    },
  ];

  return (
    <>
      <h1>Welcome to Washroom Finder</h1>
      {/* Coordinates for Edmonton in MapContainer */}
      <MapContainer center={[53.631611, -113.323975]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {washroomsLocations.map((washroom, index) => (
          <Marker
            key={index}
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
