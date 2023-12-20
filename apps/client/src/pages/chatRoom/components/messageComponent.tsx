import { Message, MessageType } from '@api/models';
import { UserAvatar } from '@common/avatar/userAvatar';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface MessageBoxProps {
    isOwner: boolean;
    message: Message;
}

export function MessageBox(props: MessageBoxProps) {
    const message = props.message;
    const isOwner = props.isOwner;

    if (message.type === MessageType.ADMINISTRATIVE) {
        return (
            <Box mx={'auto'} maxWidth={'200px'} mb={1} borderRadius={4} px={2} bgcolor={grey[600]} color={grey[200]}>
                <Typography variant="caption">{message.content}</Typography>
            </Box>
        );
    }

    return (
        <Box display={'flex'} justifyContent={isOwner ? 'flex-end' : 'flex-start'} mb={1}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isOwner ? 'row' : 'row-reverse',
                    alignItems: '',
                    gap: '10px',
                    maxWidth: '400px',
                }}
            >
                <Box>
                    <Box bgcolor={grey[300]} color={grey[800]} px={3} py={1} borderRadius={2}>
                        <Typography sx={{ wordBreak: 'break-word' }} fontSize={14}>
                            {message.content}
                        </Typography>
                    </Box>
                    <Typography fontSize={11} textAlign={isOwner ? 'right' : 'left'}>
                        {message.owner.name}
                    </Typography>
                </Box>
                <UserAvatar
                    typography={{ variant: 'caption' }}
                    user={message.owner}
                    sx={{ width: '30px', height: '30px' }}
                />
            </Box>
        </Box>
    );
}
