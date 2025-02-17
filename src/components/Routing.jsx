import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function Routing({ userLocation, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const destinationIcon = new L.Icon({
      iconUrl: '../toiletRedIcon.png', 
      iconSize: [54, 54], // size in pixels, x * y
    });

    const userIcon = new L.Icon({
      iconUrl: '../userIcon.png',
      iconSize: [54, 54], // size in pixels, x * y
    });

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.latitude, userLocation.longitude),
        L.latLng(destination.latitude, destination.longitude),
      ],
      routeWhileDragging: true,
      createMarker: (i, waypoint, n) => {
        if (i === 0) {
          // Use the custom user icon for the first waypoint (origin)
          return L.marker(waypoint.latLng, { icon: userIcon }).addTo(map);
        }
        else if (i === n - 1) {
          // Use the custom destination icon for the last waypoint (destination)
          return L.marker(waypoint.latLng, { icon: destinationIcon }).addTo(map);
        } else {
          // Use the default marker for other waypoints
          return L.marker(waypoint.latLng).addTo(map);
        }
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userLocation, destination]);

  return null;
}
