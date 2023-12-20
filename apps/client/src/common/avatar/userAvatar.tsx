import { UserModel } from '@api/models';
import { API_URL } from '@configs/index';
import { Avatar, Typography } from '@mui/material';
import React from 'react';

interface UserAvatarProps {
    user: UserModel;
    typography?: React.ComponentProps<typeof Typography>;
}

export function UserAvatar(props: UserAvatarProps & Partial<React.ComponentProps<typeof Avatar>>) {
    const user = props.user;
    return (
        <Avatar
            alt={user.name}
            src={user.profilePicture && `${API_URL}/uploads/${user.profilePicture}`}
            sx={{ width: '300px', height: '300px' }}
            {...props}
        >
            <Typography variant="h1" fontWeight={500} {...props.typography}>
                {user.name[0].toUpperCase()}
            </Typography>
        </Avatar>
    );
}
