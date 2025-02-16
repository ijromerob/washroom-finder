import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'

function App() {
  const [count, setCount] = useState(0);
  const [washroomsLocations, setWashroomsLocations] = useState([]);
  const customIcon = new Icon({
    iconUrl: "public/icon.png",
    iconSize: [54, 54] // size in pixels, x * y
  })

  useEffect(() => {
    fetch('https://express-server-oktc.onrender.com/locations/alllocations')
      .then((response) => response.json())
      .then((data) => {
        setWashroomsLocations(data);
      });
  }, []);

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
            icon = {customIcon}
          >
            <Popup>{washroom.location_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default App;
