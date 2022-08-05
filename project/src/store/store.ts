import {configureStore} from '@reduxjs/toolkit';
import {api} from '../api';
import {redirect} from './middlewares/redirect/redirect';
import {reducer} from './reducer';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export default store;
