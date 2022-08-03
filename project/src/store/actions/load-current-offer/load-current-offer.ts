import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppStatus} from '../../../const';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseOffer, parseReview} from '../../../utils';
import {setCurrentOffer, setAppStatus, setNearOffers, setReviews} from '..';

/**
 * Action for loading offer from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadCurrentOffer = createAsyncThunk<
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
  'data/loadOffer',
  async ({offerId}, {dispatch, extra: api}) => {
    dispatch(setAppStatus({status: AppStatus.Pending}));

    const {data: offerData} = await api.get<JSONValue>(`/hotels/${offerId}`);
    dispatch(setCurrentOffer({offer: parseOffer(offerData)}));
    const {data: nearOffersData} = await api.get<JSONValue[]>(`/hotels/${offerId}/nearby`);
    dispatch(setNearOffers({offers: nearOffersData.map(parseOffer)}));
    const {data: reviewsData} = await api.get<JSONValue[]>(`/comments/${offerId}`);
    dispatch(setReviews({reviews: reviewsData.map(parseReview)}));

    dispatch(setAppStatus({status: AppStatus.Ready}));
  },
);

export default loadCurrentOffer;
