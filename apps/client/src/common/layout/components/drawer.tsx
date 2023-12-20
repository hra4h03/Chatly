import { RoutePaths } from '@configs/index';
import { AddRounded, SettingsRounded } from '@mui/icons-material';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function AppDrawer() {
    const navigate = useNavigate();
    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate(RoutePaths.settings())}>
                        <ListItemIcon>
                            <SettingsRounded />
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <div style={{ flexGrow: 1 }} />
            <Button
                onClick={() => navigate(RoutePaths.home())}
                variant="contained"
                sx={{ m: 1 }}
                color="primary"
                endIcon={<AddRounded />}
            >
                Join Room
            </Button>
        </Drawer>
    );
}
