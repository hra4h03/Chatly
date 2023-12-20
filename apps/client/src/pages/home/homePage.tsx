import { ChatRoomService } from '@api/services/ChatRoomService';
import { MESSAGES } from '@configs/app.messages';
import { RoutePaths } from '@configs/index';
import { AddRounded } from '@mui/icons-material';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const joinRoomScheme = z.object({
    name: z.string({
        required_error: MESSAGES['field.is.required'],
    }),
});

export function HomePage() {
    const navigate = useNavigate();
    const formik = useFormik<{ name: string }>({
        validationSchema: toFormikValidationSchema(joinRoomScheme),
        initialValues: {
            name: '',
        },
        async onSubmit(input) {
            const room = await ChatRoomService.join(input.name);
            navigate(RoutePaths.room(room.data.uuid));
        },
    });

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} p={2}>
            <form onSubmit={formik.handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
                <TextField
                    autoComplete="off"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Room Name"
                    name="name"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Button variant="contained" type="submit" endIcon={<AddRounded fontSize="large" />}>
                    Join
                </Button>
            </form>
        </Box>
    );
}
