import {createSlice} from '@reduxjs/toolkit';
import {AppStatus, NameSpace} from '../../const';
import {DataState} from '../../types';
import {loadCurrentOffer, loadOffers, postReview, loadFavorites, updateFavorites} from '../actions';

const initialState: DataState = {
  offers: [],
  currentOffer: null,
  nearOffers: [],
  reviews: [],
  favorites: [],
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
    setAppStatus: (state, action) => {
      state.appStatus = action.payload;
    }
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
      .addCase(postReview.pending, (state) => {
        state.appStatus = AppStatus.Pending;
      })
      .addCase(postReview.rejected, (state) => {
        state.appStatus = AppStatus.Error;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.appStatus = AppStatus.Ready;
      })
      .addCase(loadFavorites.pending, (state) => {
        state.appStatus = AppStatus.Pending;
      })
      .addCase(loadFavorites.rejected, (state) => {
        state.appStatus = AppStatus.Error;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.appStatus = AppStatus.Ready;
      })
      .addCase(updateFavorites.rejected, (state) => {
        state.appStatus = AppStatus.Error;
      })
      .addCase(updateFavorites.fulfilled, (state, {payload: updatedOffer}) => {
        // update offer in store
        const {id: offerId, isFavorite} = updatedOffer;
        const index = state.offers.findIndex(({id}) => id === offerId);
        state.offers[index] = updatedOffer;

        // update current offer
        if (state.currentOffer?.id === offerId) {
          state.currentOffer = updatedOffer;
        }

        //update near offer
        const nearIndex = state.nearOffers.findIndex(({id}) => id === offerId);
        if (nearIndex >= 0) {
          state.nearOffers[nearIndex] = updatedOffer;
        }

        // update favorites in store
        if (isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          const favIndex = state.favorites.findIndex(({id}) => id === offerId);
          state.favorites.splice(favIndex, 1);
        }
      });
  }
});

export const {resetCurrentOffer, setAppStatus} = dataSlice.actions;

