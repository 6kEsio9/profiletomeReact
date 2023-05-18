import { createContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {


    const [auth, setAuth] = useLocalStorage('auth', null);

    const onLogin = useCallback((user) => {
        setAuth(user);
    }, [setAuth]);

    const onLogout = useCallback(() => {
        setAuth(null);
    }, [setAuth]);

    return (
        <AuthContext.Provider value={{ auth, onLogin, onLogout }} >
            {children}
        </AuthContext.Provider >
    );
}

export default AuthContext;
