import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
