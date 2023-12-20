import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoom } from 'src/chat-room/entities/chat-room.entity';
import { ChatRoomRepository } from 'src/chat-room/repositories/chat-room.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatRoomService {
    constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

    getHistory(uuid: string) {
        const room = this.chatRoomRepository.findByUuid(uuid);
        if (!room) throw new NotFoundException();

        return room.messages;
    }

    join(user: User, chatRoomName: string) {
        const chatRoom = this.chatRoomRepository.findByName(chatRoomName);
        if (chatRoom) {
            chatRoom.joinRoom(user);
            return chatRoom;
        }

        const room = ChatRoom.create({ name: chatRoomName, owner: user });
        this.chatRoomRepository.save(room);

        return room;
    }

    newMessage(user: User, chatRoomUuid: string, content: string) {
        const chatRoom = this.chatRoomRepository.findByUuid(chatRoomUuid);
        if (!chatRoom) throw new NotFoundException();

        const message = chatRoom.addMessage(user, content);

        return message;
    }
}
