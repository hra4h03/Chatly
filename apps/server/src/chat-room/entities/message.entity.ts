import { MessageType } from 'src/chat-room/entities/message.enum';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class Message {
    static create(fields: {
        owner: User;
        content: string;
        chatRoomId: string;
        messageType?: MessageType;
    }) {
        return new Message(
            fields.owner,
            fields.chatRoomId,
            fields.content,
            fields.messageType ?? MessageType.USER_MESSAGE,
        );
    }

    uuid: string;
    owner: User;
    content: string;
    chatRoomId: string;
    timestamp: Date;
    type: MessageType;

    constructor(
        owner: User,
        chatRoomId: string,
        content: string,
        type = MessageType.USER_MESSAGE,
    ) {
        this.uuid = uuidv4();
        this.owner = owner;
        this.content = content;
        this.chatRoomId = chatRoomId;
        this.timestamp = new Date();
        this.type = type;
    }
}
