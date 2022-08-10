import {datatype, name} from 'faker';
import {City} from '../../types';

const mockCity = (): City => ({
  name: name.title(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  }
});

export default mockCity;
