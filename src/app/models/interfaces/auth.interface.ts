export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IUser {
    uid: string;
    name: string;
    email: string;
}