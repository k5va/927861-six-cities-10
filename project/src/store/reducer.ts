import {createReducer} from '@reduxjs/toolkit';
import {setAppStatus, setAuthStatus, setCity, setOffers, setUser} from './actions';
import {AppStatus, AuthStatus, Cities} from '../const';
import {Offer, User} from '../types';

const initialState: {
  city: Cities;
  offers: Offer[];
  appStatus: AppStatus;
  authStatus: AuthStatus;
  user: User | null;
  error: string | null;
} = {
  city: Cities.Paris,
  offers: [],
  appStatus: AppStatus.Pending,
  authStatus: AuthStatus.Unknown,
  user: null,
  error: null,
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
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload.status;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload.user;
    });
});

export {reducer};
