import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const SecureRoutes = (Component) => {
    const WrapperComponent = (props) => {
        let { auth } = useAuth();

        return auth
            ? <Component {...props} auth={auth} />
            : <Navigate to='/login' />
    };

    return WrapperComponent;
};

export const isLogged = (Component) => {
    const WrapperComponent = (props) => {
        let { auth } = useAuth();

        return auth
            ? <Navigate to='/' />
            : <Component {...props} auth={auth} />
    }

    return WrapperComponent;
};