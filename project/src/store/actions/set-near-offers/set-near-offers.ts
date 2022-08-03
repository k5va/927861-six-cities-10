import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../../../types';

const setNearOffers = createAction<{offers: Offer[]}>('data/setNearOffers');

export default setNearOffers;
