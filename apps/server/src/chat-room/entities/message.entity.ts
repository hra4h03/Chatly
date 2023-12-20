import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class Message {
    static create(fields: {
        owner: User;
        content: string;
        chatRoomId: string;
    }) {
        return new Message(fields.owner, fields.chatRoomId, fields.content);
    }

    uuid: string;
    owner: User;
    content: string;
    chatRoomId: string;
    timestamp: Date;

    constructor(owner: User, chatRoomId: string, content: string) {
        this.uuid = uuidv4();
        this.owner = owner;
        this.content = content;
        this.chatRoomId = chatRoomId;
        this.timestamp = new Date();
    }
}
