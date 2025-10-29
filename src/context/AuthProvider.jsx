import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';

function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    
    const login = () => {
        console.log("Inicio de sesion exitoso")
        setIsAuth(true);
    };

    const logout = () => {
        console.log("Cierre de sesion exitoso")
        setIsAuth(false);
    }

    const value = {
        isAuth,
        login,
        logout
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthProvider;