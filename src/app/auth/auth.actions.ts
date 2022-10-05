import { createAction, props } from '@ngrx/store';

import { User } from '../models/entities/user.model';

export const setUserAction = createAction(
    '[Auth] setUser',
    props<{ user: User }>(),
);

export const cleanUserAction = createAction('[Auth] cleanUser');
