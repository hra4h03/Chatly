import { UserModel } from '@api/models';
import { UserService } from '@api/services';
import { UserAvatar } from '@common/avatar/userAvatar';
import { FileUploadButton } from '@common/fileUpload/fileUpload.button';
import { Box, TextField, Typography } from '@mui/material';
import { useAuth } from '@pages/auth/auth.context';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export function SettingsPage() {
    const auth = useAuth();
    const user = auth.user as UserModel;

    const handleUpload = async (files: FileList | null) => {
        if (!files) return;
        const file = files[0];

        try {
            await UserService.uploadProfilePicture(file);
            await auth.load();
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data);
        }
    };

    return (
        <Box p={2} display={'flex'} justifyContent={'center'}>
            <Box>
                <Typography textAlign={'center'} variant="h5">
                    Settings
                </Typography>
                <TextField
                    autoComplete="off"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    id="username"
                    fullWidth
                    label="Username"
                    name="username"
                    autoFocus
                    sx={{ width: '300px' }}
                    value={user.name}
                />
                <UserAvatar user={user} />
                <FileUploadButton
                    content="Upload Profile Picture"
                    sx={{ width: '300px', mt: 2 }}
                    onUpload={handleUpload}
                    accept=".jpeg,.jpg"
                />
            </Box>
        </Box>
    );
}
