import { Action, createReducer, on } from '@ngrx/store';

import { cleanUserAction, setUserAction } from './auth.actions';
import { User } from '../models/entities/user.model';

export interface AuthState {
    user: User | null; 
}

export const initialState: AuthState = {
   user: null,
}

export const authReducer = createReducer(
    initialState,
    on(setUserAction, state => ({ ...state, user: state.user!.clone() })),
    on(cleanUserAction, state => ({ ...state, user: null})),
);
