import { Loading } from '@common/loading/loading';
import { useAuth } from '@pages/auth/auth.context';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticatedApp = lazy(() => import('@apps/authenticated.app'));
const UnauthenticatedApp = lazy(() => import('@apps/unauthenticated.app'));

function App() {
    const auth = useAuth();
    const renderApp = () => {
        if (auth.user === false)
            return (
                <Suspense fallback={<Loading />}>
                    <UnauthenticatedApp />
                </Suspense>
            );

        if (auth.user === null) return <Loading />;

        return (
            <Suspense fallback={<Loading />}>
                <AuthenticatedApp />
            </Suspense>
        );
    };

    return (
        <>
            {renderApp()}
            <ToastContainer />
        </>
    );
}

export default App;
