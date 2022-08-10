import {datatype, name, system, internet} from 'faker';
import {User} from '../../types';

const mockCity = (): User => ({
  id: datatype.number(),
  name: name.firstName(),
  isPro: datatype.boolean(),
  email: internet.email(),
  avatarUrl: system.filePath(),
});

export default mockCity;
