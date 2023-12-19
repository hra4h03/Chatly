import { v4 as uuidv4 } from 'uuid';

export class Message {
    static create(fields: {
        ownerId: string;
        content: string;
        chatRoomId: string;
    }) {
        return new Message(fields.ownerId, fields.content, fields.chatRoomId);
    }

    uuid: string;
    ownerId: string;
    content: string;
    chatRoomId: string;
    timestamp: Date;

    constructor(ownerId: string, chatRoomId: string, content: string) {
        this.uuid = uuidv4();
        this.ownerId = ownerId;
        this.content = content;
        this.chatRoomId = chatRoomId;
        this.timestamp = new Date();
    }
}
