import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../../../types';

const setOffers = createAction<{offers: Offer[]}>('city/setOffers');

export default setOffers;
