import {createSlice} from '@reduxjs/toolkit';
import {Cities, NameSpace} from '../../const';
import {AppState} from '../../types';

const initialState: AppState = {
  city: Cities.Paris,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {setCity} = appSlice.actions;
