import { UserModel } from '@api/models';
import { ForumRounded, LogoutRounded } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useAuth } from '@pages/auth/auth.context';

export function Navbar() {
    const auth = useAuth();
    const user = auth.user as UserModel;

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <ForumRounded />
                <Typography ml={1} variant="h6" noWrap component="div">
                    Chatly
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <Typography variant="h6" noWrap component="div">
                    {user.name}
                </Typography>
                <IconButton
                    onClick={auth.logout}
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    sx={{ ml: 2 }}
                >
                    <LogoutRounded />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
