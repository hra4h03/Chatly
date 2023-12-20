import { MainLayout } from '@common/layout/main.layout';
import { RoutePaths } from '@configs/route/route.config';
import { ChatRoomPage } from '@pages/chatRoom/chatRoomPage';
import { HomePage } from '@pages/home/homePage';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const authenticatedRoutes: RouteObject[] = [
    {
        element: <MainLayout />,
        path: RoutePaths.home(),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: RoutePaths.room(),
                element: <ChatRoomPage />,
            },
        ],
    },
    {
        path: RoutePaths.fallback(),
        element: <Navigate to={RoutePaths.home()} />,
    },
];

function AuthenticatedApp() {
    return useRoutes(authenticatedRoutes);
}

export default AuthenticatedApp;
