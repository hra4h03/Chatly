import { Message } from 'src/chat-room/entities/message.entity';

export class MessageDto {
    static fromEntity(entity: Message | Message[]) {
        if (Array.isArray(entity)) {
            return entity.map((e) => MessageDto.fromEntity(e));
        }
        const dto = new MessageDto();
        dto.id = entity.uuid;
        dto.userId = entity.ownerId;
        dto.content = entity.content;
        dto.chatRoomId = entity.chatRoomId;
        dto.timestamp = entity.timestamp;
        return dto;
    }

    id: string;
    userId: string;
    content: string;
    chatRoomId: string;
    timestamp: Date;
}
