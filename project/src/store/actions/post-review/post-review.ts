import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { ApiRoute } from '../../../const';
import {AppDispatch, JSONValue, Review, State} from '../../../types';
import {parseReview} from '../../../utils';

/**
 * Action for posting review to server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const postReview = createAsyncThunk<
  Review[], // action callback return value type
  { // _arg type
    offerId: number,
    comment: string,
    rating: number,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/postReview',
  async ({offerId, comment, rating}, {extra: api}) => {
    await api.post(`${ApiRoute.Reviews}/${offerId}`, {comment, rating});
    const {data} = await api.get<JSONValue[]>(`${ApiRoute.Reviews}/${offerId}`);
    return data.map(parseReview);
  },
);

export default postReview;
