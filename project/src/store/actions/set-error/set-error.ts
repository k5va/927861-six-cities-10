import {createAction} from '@reduxjs/toolkit';

const setError = createAction<{error: string | null}>('app/setError');

export default setError;
