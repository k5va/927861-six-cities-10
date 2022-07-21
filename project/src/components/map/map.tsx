import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {useMap} from '../../hooks';
import 'leaflet/dist/leaflet.css';
import {MapProps} from './types';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
});

function Map({city, offers, selectedOffer, mode}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          selectedOffer !== undefined && offer.id === selectedOffer.id ?
            currentCustomIcon : defaultCustomIcon
        ).addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section ref={mapRef} className={`${mode}__map map`}></section>;
}

export default Map;
