import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseReview} from '../../../utils';
import {setReviews} from '../../actions';

/**
 * Action for loading reviews from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadReviews = createAsyncThunk<
  void, // action callback return value type
  { // _arg type
    offerId: number,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/loadReviews',
  async ({offerId}, {dispatch, extra: api}) => {
    const {data} = await api.get<JSONValue[]>(`/comments/${offerId}`);
    dispatch(setReviews({reviews: data.map(parseReview)}));
  },
);

export default loadReviews;
