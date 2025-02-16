import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import MaxClusterGroup from 'react-leaflet-cluster'
import MarkerClusterGroup from 'react-leaflet-cluster'

function App() {
  const [count, setCount] = useState(0)
  // Test markers
  const markers = [
    {
      geocode: [48.86, 51.13],
      popUp: "This is a washroom's location"
    },
    {
      geocode: [48.96, 51.13],
      popUp: "This is a washroom's location"
    },
    {
      geocode: [48.86, 51.23],
      popUp: "This is a washroom's location"
    }
  ];

  return (
    <>
      <h1>Welcome to Washroom Finder</h1>
      {/* Coordinates for Edmonton in MapContainer */}
      <MapContainer center = {[53.631611, -113.323975]} zoom = {13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup>
          {markers.map(marker => (
            <Marker position = {marker.geocode}>
              <Popup>
                {marker.popUp}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  )
}

export default App
