import { MessageDto } from 'src/chat-room/dto/message/message.dto';
import { ChatRoom } from 'src/chat-room/entities/chat-room.entity';
import { UserDto } from 'src/user/dto/user.dto';

export class ChatRoomDto {
    static fromEntity(entity: ChatRoom) {
        const dto = new ChatRoomDto();
        dto.uuid = entity.uuid;
        dto.name = entity.name;
        dto.messages = MessageDto.fromEntity(entity.messages);
        dto.participants = UserDto.fromEntity(entity.participants);
        dto.owner = UserDto.fromEntity(entity.owner);
        return dto;
    }

    uuid: string;
    name: string;
    messages: MessageDto[];
    participants: UserDto[];
    owner: UserDto;
}
