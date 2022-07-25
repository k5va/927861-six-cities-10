import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {State} from '../../types';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default useAppSelector;
