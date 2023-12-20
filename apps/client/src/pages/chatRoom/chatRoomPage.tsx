import { Message, UserModel } from '@api/models';
import { ChatRoomService } from '@api/services/ChatRoomService';
import { RoutePaths } from '@configs/index';
import { useSocket } from '@hooks/useSocket';
import { CopyAllRounded, SendRounded } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useAuth } from '@pages/auth/auth.context';
import { MessageBox } from '@pages/chatRoom/components/messageComponent';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function ChatRoomPage() {
    const params = useParams<{ uuid: string }>();
    const navigate = useNavigate();
    const dummy = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Array<Message>>([]);

    const socket = useSocket();
    const auth = useAuth();
    const user = auth.user as UserModel;

    const postMessage = (message: string) => {
        socket!.emit('post-message', { chatRoomId: params.uuid, content: message });
        setMessage('');
    };

    useEffect(() => {
        if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (!params.uuid) return navigate(RoutePaths.home());

        async function getHistory() {
            const response = await ChatRoomService.getHistory(params.uuid!);
            setMessages(response.data);
        }

        getHistory();
    }, [navigate, params.uuid]);

    useEffect(() => {
        if (!socket) return;

        function onNewMessage(message: Message) {
            setMessages((m) => [...m, message]);
            dummy.current?.scrollIntoView({ behavior: 'smooth' });
        }

        socket.on('new-message', onNewMessage);

        socket.connect();
        socket.emit('join-room', params.uuid);

        return () => {
            socket.off('new-message', onNewMessage);
        };
    }, [params.uuid, socket]);

    return (
        <Box px={2} pt={2}>
            <Paper
                elevation={3}
                sx={{ p: 2, mb: 2 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Button
                    variant="outlined"
                    endIcon={<CopyAllRounded />}
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                    Copy Room Link
                </Button>
                <Box>{socket?.connected ? '🟢' : '🔴'}</Box>
            </Paper>
            <Box display={'flex'} flexDirection={'column'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{ overflowY: 'auto', height: 'calc(100vh - 265px)' }}
                >
                    {messages.map((message) => (
                        <MessageBox key={message.uuid} isOwner={message.owner.uuid === user.uuid} message={message} />
                    ))}
                    <div ref={dummy} />
                </Box>
                <Box display={'flex'}>
                    <TextField
                        autoComplete="off"
                        multiline
                        rows={3}
                        size="small"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        id="content"
                        label="Message"
                        name="content"
                        autoFocus
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => {
                            e.key === 'Enter' && postMessage(message);
                        }}
                    />
                    <IconButton
                        disabled={!message}
                        sx={{ alignSelf: 'center', color: message ? blue[800] : grey[400] }}
                        onClick={() => postMessage(message)}
                    >
                        <SendRounded fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
