import { UserModel } from '@api/models';

export interface ChatRoom {
    uuid: string;
    name: string;
    participants: UserModel[];
    owner: UserModel;
}
