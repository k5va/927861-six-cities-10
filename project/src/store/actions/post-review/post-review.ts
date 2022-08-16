import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute, AppStatus} from '../../../const';
import {AppDispatch, JSONValue, Review, State} from '../../../types';
import {parseReview} from '../../../utils';
import {setAppStatus} from '../../data-slice/data-slice';

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
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`${ApiRoute.Reviews}/${offerId}`, {comment, rating});
    const {data} = await api.get<JSONValue[]>(`${ApiRoute.Reviews}/${offerId}`);
    const reviews = data.map(parseReview);
    dispatch(setAppStatus(AppStatus.Done));
    return reviews;
  },
);

export default postReview;
