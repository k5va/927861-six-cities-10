import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../../../types';
import {setError} from '../../actions';

const CLEAR_ERROR_TIMEOUT = 5000;

/**
 * Action for clearing error
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const clearError = createAsyncThunk<
  void, // action callback return value type
  undefined, // _arg type
  { // thunkAPI params types
    dispatch: AppDispatch,
  }
>(
  'app/clearError',
  async (_arg, {dispatch}) => { // TODO: Why async?
    setTimeout(() => dispatch(setError({error: null})), CLEAR_ERROR_TIMEOUT);
  },
);

export default clearError;
