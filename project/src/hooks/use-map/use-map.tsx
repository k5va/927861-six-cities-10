import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {Location} from '../../types';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: Location): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  // Effect for initializing map
  useEffect(() => {
    if (!isRenderedRef.current && mapRef.current) {
      const mapInstance = new Map(mapRef.current);
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      mapInstance.addLayer(layer);
      setMap(mapInstance);
      isRenderedRef.current = true;
    }
  }, [mapRef]);

  // Effect for changing map's location
  useEffect(() => {
    const {latitude, longitude, zoom} = location;
    map?.setView({lat: latitude, lng: longitude}, zoom);
  }, [location, map]);

  return map;
}

export default useMap;
