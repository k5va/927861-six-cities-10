import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../../../types';

const setCurrentOffer = createAction<{offer: Offer | null}>('data/setCurrentOffer');

export default setCurrentOffer;
