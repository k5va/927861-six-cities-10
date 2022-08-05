import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataState} from '../../types';
import {loadCurrentOffer, loadOffers, postReview} from '../actions';

const initialState: DataState = {
  offers: [],
  currentOffer: null,
  nearOffers: [],
  reviews: [],
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
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(loadCurrentOffer.fulfilled, (state, action) => {
        const [offer, nearOffers, reviews] = action.payload;

        state.currentOffer = offer;
        state.nearOffers = nearOffers;
        state.reviews = reviews;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const {resetCurrentOffer} = dataSlice.actions;

