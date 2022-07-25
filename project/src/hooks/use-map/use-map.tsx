import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';
import {Location} from '../../types';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: Location): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    const {latitude, longitude, zoom} = location;

    if (!mapRef.current) {
      return;
    }

    if (!isRenderedRef.current) {
      const mapInstance = new Map(mapRef.current, {center: {lat: latitude, lng: longitude}, zoom});

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
    } else {
      map?.setView({lat: latitude, lng: longitude}, zoom);
    }
  }, [mapRef, location, map]);

  return map;
}

export default useMap;
