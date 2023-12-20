import { Message } from 'src/chat-room/entities/message.entity';
import { UserDto } from 'src/user/dto/user.dto';

export class MessageDto {
    static fromEntity(entity: Message | Message[]) {
        if (Array.isArray(entity)) {
            return entity.map((e) => MessageDto.fromEntity(e));
        }
        const dto = new MessageDto();
        dto.uuid = entity.uuid;
        dto.owner = UserDto.fromEntity(entity.owner);
        dto.content = entity.content;
        dto.chatRoomId = entity.chatRoomId;
        dto.timestamp = entity.timestamp;
        return dto;
    }

    uuid: string;
    owner: UserDto;
    content: string;
    chatRoomId: string;
    timestamp: Date;
}
