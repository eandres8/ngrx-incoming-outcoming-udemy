export type IncomingOutcomingType = 'INCOMING' | 'OUTCOMING';

export interface IIncomingOutcoming {
    uid: string;
    description: string;
    value: string;
    type: IncomingOutcomingType;
}
