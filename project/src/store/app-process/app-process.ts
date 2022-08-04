import {createSlice} from '@reduxjs/toolkit';
import {AppStatus, Cities, NameSpace} from '../../const';
import {AppProcess} from '../../types';

const initialState: AppProcess = {
  city: Cities.Paris,
  appStatus: AppStatus.Pending,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setAppStatus: (state, action) => {
      state.appStatus = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {setAppStatus, setCity} = appProcess.actions;
