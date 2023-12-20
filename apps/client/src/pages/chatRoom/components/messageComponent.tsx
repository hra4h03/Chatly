import { Message } from '@api/models';
import { UserAvatar } from '@common/avatar/userAvatar';
import { AccountCircleRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

interface MessageBoxProps {
    isOwner: boolean;
    message: Message;
}

export function MessageBox(props: MessageBoxProps) {
    const message = props.message;
    const isOwner = props.isOwner;

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
                    <Box bgcolor={blue[600]} color={grey[100]} px={3} py={1} borderRadius={2}>
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