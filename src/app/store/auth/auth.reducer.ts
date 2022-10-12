import { createReducer, on } from '@ngrx/store';

import { cleanUserAction, setUserAction } from './auth.actions';
import { IUser } from 'src/app/models/interfaces/auth.interface';

export interface AuthState {
    user: IUser | null; 
}

export const initialState: AuthState = {
   user: null,
}

export const authReducer = createReducer(
    initialState,
    on(setUserAction, (state, { user }) => ({ ...state, user: { ...user } })),
    on(cleanUserAction, state => ({ ...state, user: null})),
);
