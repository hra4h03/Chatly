import { AppDrawer } from '@common/layout/components/drawer';
import { Navbar } from '@common/layout/components/navbar';
import { Loading } from '@common/loading/loading';
import { RoutePaths } from '@configs/index';
import { Box, Toolbar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useAuth } from '@pages/auth/auth.context';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function MainLayout() {
    const { user } = useAuth();

    if (!user) return <Navigate to={RoutePaths.login()} />;
    return (
        <Box display={'flex'} bgcolor={grey[800]}>
            <Navbar />
            <AppDrawer />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
                <Toolbar />
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Box>
        </Box>
    );
}
