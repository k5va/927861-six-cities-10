import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseReview} from '../../../utils';
import {setReviews} from '../../actions';

/**
 * Action for posting review to server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const postReview = createAsyncThunk<
  void, // action callback return value type
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
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`/comments/${offerId}`, {comment, rating});
    const {data} = await api.get<JSONValue[]>(`/comments/${offerId}`);
    dispatch(setReviews({reviews: data.map(parseReview)}));
  },
);

export default postReview;
