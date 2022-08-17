import {renderHook} from '@testing-library/react';
import {Map} from 'leaflet';
import {useRef} from 'react';
import {useMap} from '../../hooks';

describe('Hook: useMap', () => {
  it('should return Map object', () => {
    const {result} = renderHook(
      () => {
        const mapRef = useRef(document.createElement('div'));
        return useMap(mapRef, {latitude: 10, longitude: 10, zoom: 15});
      },
    );

    const map = result.current;
    expect(map).toBeInstanceOf(Map);
  });
});
