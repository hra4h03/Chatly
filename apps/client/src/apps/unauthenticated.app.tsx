import { LoginPage } from '@pages/auth/pages/loginPage';
import { RoutePaths } from '@configs/index';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignupPage } from '@pages/auth/pages/signupPage';

function UnauthenticatedApp() {
    return (
        <Routes>
            <Route path={RoutePaths.login()} element={<LoginPage />} />
            <Route path={RoutePaths.signup()} element={<SignupPage />} />
            <Route path={RoutePaths.fallback()} element={<Navigate to={RoutePaths.login()} />} />
        </Routes>
    );
}

export default UnauthenticatedApp;
