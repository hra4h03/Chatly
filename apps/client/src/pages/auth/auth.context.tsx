import { LoginModel, SignupModel, UserModel } from '@api/models';
import { UserService } from '@api/services';
import { CredentialsService } from '@api/services/CredentialsService';
import { isAxiosError } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext({
    user: null as UserModel | null | false,
    async login(_input: LoginModel): Promise<void> {},
    async signup(_input: SignupModel): Promise<void> {},
    async load(): Promise<void> {},
    logout() {},
});

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }: React.PropsWithChildren<unknown>) {
    // null = loading, false = not logged in, UserModel = logged in
    const [user, setUser] = useState<UserModel | null | false>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const response = await UserService.me();
            setUser(response.data);
        } catch (error) {
            CredentialsService.clear();
            setUser(false);
        }
    };

    const login = async (input: LoginModel): Promise<void> => {
        try {
            const response = await UserService.login(input);
            setUser(response.data);
            CredentialsService.store(input);
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

    const signup = async (input: SignupModel): Promise<void> => {
        try {
            const response = await UserService.signup(input);
            setUser(response.data);
            CredentialsService.store(input);
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

    const logout = () => {
        setUser(false);
        CredentialsService.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                signup,
                logout,
                login,
                load,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function RequireAuth(props: React.PropsWithChildren<{ fallbackUrl: string }>) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to={props.fallbackUrl} state={{ from: location.pathname }} />;
    }

    return props.children;
}

export { AuthProvider, RequireAuth, useAuth };
