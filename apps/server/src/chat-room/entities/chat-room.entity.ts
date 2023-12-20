import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './message.entity';
import { UserIsNotInRoomException } from 'src/chat-room/error/user-is-not-in-room.error';

export class ChatRoom {
    static create(fields: { name: string; owner: User }): ChatRoom {
        return new ChatRoom(fields.name, fields.owner);
    }

    public uuid: string;
    public name: string;
    public owner: User;
    public messages: Array<Message> = [];
    public participants: Array<User> = [];

    constructor(name: string, owner: User) {
        this.uuid = uuidv4();
        this.name = name;
        this.owner = owner;
        this.participants.push(owner);
    }

    joinRoom(user: User) {
        if (this.participants.find((u) => u.uuid === user.uuid)) return;
        this.participants.push(user);
    }

    leaveRoom(user: User) {
        const index = this.participants.findIndex((u) => u.uuid === user.uuid);
        if (index > -1) this.participants.splice(index, 1);
    }

    addMessage(user: User, message: string) {
        if (!this.participants.find((u) => u.uuid === user.uuid)) {
            throw new UserIsNotInRoomException();
        }

        const newMessage = Message.create({
            owner: user,
            chatRoomId: this.uuid,
            content: message,
        });

        this.messages.push(newMessage);

        return newMessage;
    }
}
