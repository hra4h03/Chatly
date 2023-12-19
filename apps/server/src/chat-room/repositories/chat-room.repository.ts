import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/chat-room/entities/chat-room.entity';

@Injectable()
export class ChatRoomRepository {
    private readonly chatRooms: Array<ChatRoom> = [];

    findAll(): ChatRoom[] {
        return this.chatRooms;
    }

    findByName(name: string): ChatRoom | undefined {
        return this.chatRooms.find((chatRoom) => chatRoom.name === name);
    }

    findByUuid(uuid: string): ChatRoom | undefined {
        return this.chatRooms.find((chatRoom) => chatRoom.uuid === uuid);
    }

    save(chatRoom: ChatRoom): void {
        this.chatRooms.push(chatRoom);
    }

    delete(uuid: string): void {
        const index = this.chatRooms.findIndex((c) => c.uuid === uuid);
        if (index > -1) this.chatRooms.splice(index, 1);
    }
}
