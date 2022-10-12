import { IUser } from '../interfaces/auth.interface';

export class User {
    constructor(
        public readonly uid: string,
        public readonly name: string,
        public readonly email: string,
    ) {}

    static fromMap({ uid, email, name }: IUser) {
        return new User(uid, name, email);
    }

    public copyWith(user: Partial<IUser>) {
        return new User(
            user.uid || this.uid,
            user.name || this.name,
            user.email || this.email,
        );
    }
}
