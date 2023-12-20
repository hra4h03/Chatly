import React from 'react';
import { QueryClient, QueryClientProvider as RQQueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 4000,
            refetchOnWindowFocus: false,
        },
    },
});

export const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
    return <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>;
};
