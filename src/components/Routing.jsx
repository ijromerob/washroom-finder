import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function Routing({ userLocation, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.latitude, userLocation.longitude),
        L.latLng(destination.latitude, destination.longitude),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userLocation, destination]);

  return null;
}
