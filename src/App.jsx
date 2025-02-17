import { useEffect, useState, useRef } from 'react';
import './App.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import 'leaflet-routing-machine';
import Form from './Form';
import { MapClickHandler } from './components/MapClickHandler';
import { Routing } from './components/Routing';

function App() {
  const [count, setCount] = useState(0);
  const [washroomsLocations, setWashroomsLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [destination, setDestination] = useState({});

  const toiletIcon = new Icon({
    iconUrl: '../toiletIcon.png',
    iconSize: [54, 54], // size in pixels, x * y
  });

  const userIcon = new Icon({
    iconUrl: '../userIcon.png',
    iconSize: [54, 54], // size in pixels, x * y
  });

  const destinationIcon = new Icon({
    iconUrl: '../toiletRedIcon.png',
    iconSize: [54, 54], // size in pixels, x * y
  });

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

  useEffect(() => {
    if (showForm) {
      document.body.classList.add('form-open');
    } else {
      document.body.classList.remove('form-open');
    }
  }, [showForm]);

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
      <div>
        <h1>Welcome to Washroom Finder</h1>
      </div>

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

        <MapClickHandler
          setSelectedLocation={setSelectedLocation}
          setShowForm={setShowForm}
        />

        <Marker
          position={[location.latitude, location.longitude]}
          icon={userIcon}
        >
          <Popup>{'Your Location'}</Popup>
        </Marker>

        {washroomsLocations.map((washroom) => (
          <Marker
            key={washroom.id}
            position={[washroom.latitude, washroom.longitude]}
            icon={toiletIcon}
          >
            {/* Create a button to get coordinates for pathfinding */}
            <Popup>
              {washroom.location_name}{' '}
              <button
                onClick={() => {
                  setDestination({
                    latitude: washroom.latitude,
                    longitude: washroom.longitude,
                  });
                }}
              >
                directions
              </button>
            </Popup>
          </Marker>
        ))}

        <Routing userLocation={location} destination={destination} />
      </MapContainer>

      {/* Move the Form below the map */}
      {showForm && selectedLocation && (
        <div className="form-container">
          {/* Close Button */}
          <button className="close-button" onClick={() => setShowForm(false)}>
            ✖
          </button>

          <Form
            selectedLatitude={selectedLocation.selectedLatitude}
            selectedLongitude={selectedLocation.selectedLongitude}
          />
        </div>
      )}
    </>
  );
}

export default App;
