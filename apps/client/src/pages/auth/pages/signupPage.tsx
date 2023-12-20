import { MESSAGES } from '@configs/app.messages';
import { RoutePaths } from '@configs/index';
import { useToggle } from '@hooks/useToggle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useAuth } from '@pages/auth/auth.context';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const signupScheme = z.object({
    username: z.string({
        required_error: MESSAGES['field.is.required'],
    }),
    password: z.string({
        required_error: MESSAGES['field.is.required'],
    }),
});

type SignupInput = z.infer<typeof signupScheme>;

export function SignupPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const loading = useToggle();
    const showPassword = useToggle();

    const formik = useFormik<SignupInput>({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(signupScheme),
        async onSubmit(input: SignupInput) {
            await auth.signup({
                username: input.username,
                password: input.password,
            });
            navigate(RoutePaths.home());
        },
    });

    return (
        <Paper elevation={10} sx={{ mx: 'auto', maxWidth: '400px', mt: 10, px: 4, py: 1 }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', my: 2 }}>
                Chatly
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="off"
                            size="small"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="off"
                            size="small"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            type={showPassword.value ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton tabIndex={-1} onClick={showPassword.toggle}>
                                            {showPassword.value ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" disabled={loading.value}>
                            {!loading.value ? 'Signup' : <CircularProgress size={25} />}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid item xs={12} mt={1}>
                <Typography variant="body2" align="center">
                    Already have an account?{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate(RoutePaths.login())}
                        underline="none"
                    >
                        Login
                    </Link>
                </Typography>
            </Grid>
        </Paper>
    );
}
