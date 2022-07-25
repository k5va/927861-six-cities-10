import {useRef, useEffect} from 'react';
import {Icon, LayerGroup, Marker} from 'leaflet';
import {useMap} from '../../hooks';
import 'leaflet/dist/leaflet.css';
import {MapProps} from './types';

const DEFAULT_CUSTOM_ICON = new Icon({
  iconUrl: 'img/pin.svg',
});

const CURRENT_CUSTOM_ICON = new Icon({
  iconUrl: 'img/pin-active.svg',
});

function Map({city, offers, selectedOffer, mode}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const layerGroupRef = useRef(new LayerGroup());
  const map = useMap(mapRef, city.location);

  useEffect(() => {
    const layerGroup = layerGroupRef.current;
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          selectedOffer !== null && offer.id === selectedOffer.id ?
            CURRENT_CUSTOM_ICON : DEFAULT_CUSTOM_ICON
        ).addTo(layerGroup);
      });
      map.addLayer(layerGroup);
    }
    return () => {
      layerGroup.clearLayers();
    };
  }, [map, offers, selectedOffer]);

  return <section ref={mapRef} className={`${mode}__map map`}></section>;
}

export default Map;
