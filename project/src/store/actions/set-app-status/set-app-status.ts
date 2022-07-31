import {createAction} from '@reduxjs/toolkit';
import {AppStatus} from '../../../const';

const setAppStatus = createAction<{status: AppStatus}>('app/setStatus');

export default setAppStatus;
