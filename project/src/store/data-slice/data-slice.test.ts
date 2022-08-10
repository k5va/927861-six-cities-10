import {AppStatus} from '../../const';
import {mockOffer} from '../../mocks';
import {DataState} from '../../types';
import {dataSlice} from './data-slice';
import {resetCurrentOffer} from './data-slice';

describe('Reducer: dataSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        currentOffer: null,
        nearOffers: [],
        reviews: [],
        favorites: [],
        appStatus: AppStatus.Pending,
      });
  });

  it('should reset current offer', () => {
    const state: DataState = {
      offers: [],
      currentOffer: mockOffer(),
      nearOffers: [],
      reviews: [],
      favorites: [],
      appStatus: AppStatus.Pending,
    };
    expect(dataSlice.reducer(state, resetCurrentOffer()))
      .toEqual({
        offers: [],
        currentOffer: null,
        nearOffers: [],
        reviews: [],
        favorites: [],
        appStatus: AppStatus.Pending,
      });
  });
});
