import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute, AppRoute} from '../../../const';
import {AppDispatch, JSONValue, Offer, Review, State} from '../../../types';
import {parseOffer, parseReview} from '../../../utils';
import {redirectToRoute} from '../../actions';

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
    try {
      const {data: offerData} = await api.get<JSONValue>(`${ApiRoute.Offers}/${offerId}`);
      const {data: nearOffersData} = await api.get<JSONValue[]>(
        `${ApiRoute.Offers}/${offerId}${ApiRoute.Near}`
      );
      const {data: reviewsData} = await api.get<JSONValue[]>(`${ApiRoute.Reviews}/${offerId}`);

      return [parseOffer(offerData), nearOffersData.map(parseOffer), reviewsData.map(parseReview)];
    } catch (err) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw err;
    }
  },
);

export default loadCurrentOffer;
