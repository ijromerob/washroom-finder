import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapUpdater({ location }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.latitude, location.longitude], 13);
  }, [location, map]);
  return null;
}
