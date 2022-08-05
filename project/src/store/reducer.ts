import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {dataSlice} from './data-slice/data-slice';
import {appSlice} from './app-slice/app-slice';
import {userSlice} from './user-slice/user-slice';

export const reducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
