import { createAction, props } from '@ngrx/store';

import { IUser } from '../../models/interfaces/auth.interface';

export const enum AuthActions {
    SET_USER= '[AUTH] SET_USER',
    CLEAN_USER= '[AUTH] CLEAN_USER',
}

export const setUserAction = createAction(
    AuthActions.SET_USER,
    props<{ user: IUser }>(),
);

export const cleanUserAction = createAction(AuthActions.CLEAN_USER);
