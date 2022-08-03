import {createAction} from '@reduxjs/toolkit';
import {Review} from '../../../types';

const setReviews = createAction<{reviews: Review[]}>('data/setReviews');

export default setReviews;
