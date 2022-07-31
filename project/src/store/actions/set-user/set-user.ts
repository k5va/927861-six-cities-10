import {createAction} from '@reduxjs/toolkit';
import {User} from '../../../types';

const setUser = createAction<{user: User}>('app/setUser');

export default setUser;
