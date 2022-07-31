import {createReducer} from '@reduxjs/toolkit';
import {setAppStatus, setCity, setOffers} from './actions';
import {AppStatus, Cities} from '../const';
import {Offer} from '../types';

const initialState: {
  city: Cities;
  offers: Offer[];
  appStatus: AppStatus;
} = {
  city: Cities.Paris,
  offers: [],
  appStatus: AppStatus.Pending,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(setAppStatus, (state, action) => {
      state.appStatus = action.payload.status;
    });
});

export {reducer};
