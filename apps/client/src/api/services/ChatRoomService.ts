import { ChatRoom, Message } from '@api/models';
import { CredentialsService } from '@api/services/CredentialsService';
import { HttpClient } from '@api/services/HttpClient';

export class ChatRoomService {
    static async join(roomName: string) {
        return await HttpClient.get<ChatRoom>(`/chat-room/join/${roomName}`, {
            auth: CredentialsService.get(),
        });
    }

    static async getHistory(roomUuid: string) {
        return await HttpClient.get<Array<Message>>(`/chat-room/history/${roomUuid}`, {
            auth: CredentialsService.get(),
        });
    }
}
