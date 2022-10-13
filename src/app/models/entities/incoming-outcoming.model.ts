import { IIncomingOutcoming, IncomingOutcomingType } from '../interfaces/incoming-outcomming.interface';

export class IncomingOutcoming implements IIncomingOutcoming {
    constructor(
        public readonly uid: string,
        public readonly description: string,
        public readonly value: string,
        public readonly type: IncomingOutcomingType,
    ) {}

    static fromMap(incOut: Partial<IIncomingOutcoming>) {
        return new IncomingOutcoming(
            incOut.uid || '',
            incOut.description || '',
            incOut.value || '',
            incOut.type || 'INCOMING',
        );
    }

    copyWith(incOut: Partial<IIncomingOutcoming>) {
        return new IncomingOutcoming(
            incOut.uid || this.uid,
            incOut.description || this.description,
            incOut.value || this.value,
            incOut.type || this.type,
        );
    }
}
