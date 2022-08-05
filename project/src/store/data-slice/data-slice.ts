import {createSlice} from '@reduxjs/toolkit';
import {AppStatus, NameSpace} from '../../const';
import {DataState} from '../../types';
import {loadCurrentOffer, loadOffers, postReview} from '../actions';

const initialState: DataState = {
  offers: [],
  currentOffer: null,
  nearOffers: [],
  reviews: [],
  appStatus: AppStatus.Pending,
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetCurrentOffer: (state) => {
      state.currentOffer = null;
      state.nearOffers = [];
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffers.pending, (state, action) => {
        state.appStatus = AppStatus.Pending;
      })
      .addCase(loadOffers.rejected, (state, action) => {
        state.appStatus = AppStatus.Error;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.appStatus = AppStatus.Ready;
      })
      .addCase(loadCurrentOffer.pending, (state, action) => {
        state.appStatus = AppStatus.Pending;
      })
      .addCase(loadCurrentOffer.rejected, (state, action) => {
        state.appStatus = AppStatus.Error;
      })
      .addCase(loadCurrentOffer.fulfilled, (state, action) => {
        const [offer, nearOffers, reviews] = action.payload;

        state.currentOffer = offer;
        state.nearOffers = nearOffers;
        state.reviews = reviews;
        state.appStatus = AppStatus.Ready;
      })
      .addCase(postReview.pending, (state, action) => {
        state.appStatus = AppStatus.Pending;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.appStatus = AppStatus.Error;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.appStatus = AppStatus.Ready;
      });
  }
});

export const {resetCurrentOffer} = dataSlice.actions;

