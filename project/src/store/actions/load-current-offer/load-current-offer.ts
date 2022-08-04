import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppStatus} from '../../../const';
import {AppDispatch, JSONValue, Offer, Review, State} from '../../../types';
import {parseOffer, parseReview} from '../../../utils';
import {setAppStatus} from '../../../store';

/**
 * Action for loading offer from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadCurrentOffer = createAsyncThunk<
  [Offer, Offer[], Review[]], // action callback return value type
  { // _arg type
    offerId: number,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/loadOffer',
  async ({offerId}, {dispatch, extra: api}) => {
    dispatch(setAppStatus({status: AppStatus.Pending}));

    const {data: offerData} = await api.get<JSONValue>(`/hotels/${offerId}`);
    const {data: nearOffersData} = await api.get<JSONValue[]>(`/hotels/${offerId}/nearby`);
    const {data: reviewsData} = await api.get<JSONValue[]>(`/comments/${offerId}`);

    return [parseOffer(offerData), nearOffersData.map(parseOffer), reviewsData.map(parseReview)];
  },
);

export default loadCurrentOffer;
