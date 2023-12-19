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

    newMessage(user: User, chatRoomName: string, message: string) {
        const chatRoom = this.chatRoomRepository.findByUuid(chatRoomName);
        if (!chatRoom) throw new NotFoundException();

        chatRoom.addMessage(user, message);

        return chatRoom;
    }
}
