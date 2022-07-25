import {createAction} from '@reduxjs/toolkit';
import {Cities} from '../../../const';

const setCity = createAction<{city: Cities}>('city/setCity');

export default setCity;
