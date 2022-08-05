import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {AppStatus, Cities, NameSpace} from '../../const';
import {AppProcess} from '../../types';

function isRejectedAction(action: AnyAction): boolean {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): boolean {
  return action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction): boolean {
  return action.type.endsWith('fulfilled');
}

const initialState: AppProcess = {
  city: Cities.Paris,
  appStatus: AppStatus.Pending,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilledAction, (state) => {
        state.appStatus = AppStatus.Ready;
      })
      .addMatcher(isRejectedAction, (state) => {
        state.appStatus = AppStatus.Error;
      })
      .addMatcher(isPendingAction, (state) => {
        state.appStatus = AppStatus.Pending;
      });
  }

});

export const {setCity} = appProcess.actions;
