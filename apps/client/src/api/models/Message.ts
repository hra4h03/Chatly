import { UserModel } from '@api/models';

export enum MessageType {
    USER_MESSAGE = 'USER_MESSAGE',
    ADMINISTRATIVE = 'ADMINISTRATIVE',
}

export interface Message {
    uuid: string;
    owner: UserModel;
    content: string;
    chatRoomId: string;
    timestamp: string;
    type: MessageType;
}
