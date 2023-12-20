import { CredentialsService } from '@api/services/CredentialsService';
import { API_URL } from '@configs/index';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

export function useSocket() {
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const socket = io(API_URL, {
            autoConnect: false,
            extraHeaders: {
                authorization: CredentialsService.getAsToken()!,
            },
        });

        setSocket(socket);
    }, []);

    return socket;
}
