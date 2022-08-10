import {Cities} from '../../const';
import {appSlice, setCity} from './app-slice';


describe('Reducer: appSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(appSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: Cities.Paris,
      });
  });

  it('should set city value', () => {
    const state = {
      city: Cities.Paris,
    };
    expect(appSlice.reducer(state, setCity(Cities.Amsterdam)))
      .toEqual({
        city: Cities.Amsterdam,
      });
  });
});
