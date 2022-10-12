import { createAction, props } from '@ngrx/store';

import { IUser } from '../models/interfaces/auth.interface';

export const setUserAction = createAction(
    '[Auth] setUser',
    props<{ user: IUser }>(),
);

export const cleanUserAction = createAction('[Auth] cleanUser');
