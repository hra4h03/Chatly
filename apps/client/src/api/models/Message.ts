import { UserModel } from '@api/models';

export interface Message {
    uuid: string;
    owner: UserModel;
    content: string;
    chatRoomId: string;
    timestamp: string;
}
