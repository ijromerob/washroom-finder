import { useState } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [count, setCount] = useState(0);
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
      <div>
        <h1>Welcome to Washroom Finder</h1>
      </div>
      {/* Coordinates for Edmonton in MapContainer */}
      <MapContainer center={[53.5461, -113.4938]} zoom={13} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <MarkerClusterGroup>
          {markers.map(marker => (
            <Marker position = {marker.geocode}>
              <Popup>
                {marker.popUp}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup> */}
      </MapContainer>
    </>
  );
}

export default App;
