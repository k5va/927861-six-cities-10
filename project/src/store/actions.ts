import {createAction} from '@reduxjs/toolkit';
import {Cities} from '../const';
import {Offer} from '../types';

const setCity = createAction<{city: Cities}>('city/setCity');
const setOffers = createAction<{offers: Offer[]}>('city/setOffers');

export {setCity, setOffers};
