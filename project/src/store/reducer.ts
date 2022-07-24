import {createReducer} from '@reduxjs/toolkit';
import {setCity, setOffers} from './actions';
import {offers} from '../mocks';
import {Cities} from '../const';
import {Offer} from '../types';

const initialState: {
  city: Cities;
  offers: Offer[];
} = {
  city: Cities.Paris,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload.offers;
    });
});

export {reducer};
