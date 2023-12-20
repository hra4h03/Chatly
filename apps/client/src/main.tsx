import { QueryClientProvider } from '@configs/query-client/query-client.config';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from '@pages/auth/auth.context';
import 'dayjs/locale/hy-am.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'hy-am'}>
                    <QueryClientProvider>
                        <App />
                        <CssBaseline />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </LocalizationProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
