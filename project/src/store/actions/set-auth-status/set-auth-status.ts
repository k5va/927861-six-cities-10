import {createAction} from '@reduxjs/toolkit';
import {AuthStatus} from '../../../const';

const setAuthStatus = createAction<{status: AuthStatus}>('app/setAuthStatus');

export default setAuthStatus;
