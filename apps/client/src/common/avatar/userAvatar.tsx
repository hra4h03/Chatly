import { UserModel } from '@api/models';
import { API_URL } from '@configs/index';
import { Avatar, Typography } from '@mui/material';
import React from 'react';

interface UserAvatarProps {
    user: UserModel;
    typography?: React.ComponentProps<typeof Typography>;
}

const stringToColour = (str: string) => {
    let hash = 0;
    str.split('').forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += value.toString(16).padStart(2, '0');
    }
    return colour;
};

export function UserAvatar(props: UserAvatarProps & Partial<React.ComponentProps<typeof Avatar>>) {
    const user = props.user;
    return (
        <Avatar
            alt={user.name}
            src={user.profilePicture && `${API_URL}/uploads/${user.profilePicture}`}
            sx={{ width: '300px', height: '300px' }}
            {...props}
            style={{
                backgroundColor: stringToColour(user.name),
                ...props.style,
            }}
        >
            <Typography variant="h1" fontWeight={500} {...props.typography}>
                {user.name[0].toUpperCase()}
            </Typography>
        </Avatar>
    );
}
