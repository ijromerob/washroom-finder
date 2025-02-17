import { useMapEvent } from 'react-leaflet';

export function MapClickHandler({ setSelectedLocation, setShowForm }) {
  useMapEvent('click', (e) => {
    setSelectedLocation({
      selectedLatitude: e.latlng.lat,
      selectedLongitude: e.latlng.lng,
    });
    setShowForm(true);
  });
  return null;
}
