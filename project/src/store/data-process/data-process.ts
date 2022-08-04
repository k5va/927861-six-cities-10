import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataProcess} from '../../types';
import {loadCurrentOffer, loadOffers, postReview} from '../actions';

const initialState: DataProcess = {
  offers: [],
  currentOffer: null,
  nearOffers: [],
  reviews: [],
};

export const dataProcess = createSlice({
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
        //TODO: dispatch(setAppStatus({status: AppStatus.Ready}));
      })
      .addCase(loadOffers.rejected, (state) => {
        // TODO: set app status error;
      })
      .addCase(loadCurrentOffer.fulfilled, (state, action) => {
        const [offer, nearOffers, reviews] = action.payload;

        state.currentOffer = offer;
        state.nearOffers = nearOffers;
        state.reviews = reviews;
        //TODO: dispatch(setAppStatus({status: AppStatus.Ready}));
      })
      .addCase(loadCurrentOffer.rejected, (state) => {
        // TODO: set app status error;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        //TODO: dispatch(setAppStatus({status: AppStatus.Ready}));
      })
      .addCase(postReview.rejected, (state) => {
        // TODO: set app status error;
      });
  }
});

export const {resetCurrentOffer} = dataProcess.actions;

