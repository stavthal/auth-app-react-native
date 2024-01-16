import {createContext, useState} from "react";
import { useStorage } from "../hooks/useStorage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
});

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState(null);
    function authenticate(token) {
        setAuthToken(token);
    }

    function logout() {
        const { removeData } = useStorage();

        removeData('token')
            .then(() => {
                setAuthToken(null);
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthContextProvider;
