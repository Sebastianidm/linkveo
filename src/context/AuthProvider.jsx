// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';
// 1. IMPORTA apiRegister TAMBIÉN
import { apiLogin, apiRegister } from '../services/authService.js'; 

const getInitialToken = () => {
  return localStorage.getItem('token');
}

function AuthProvider({ children }) {
    const [token, setToken] = useState(getInitialToken()); 
    const [isAuth, setIsAuth] = useState(!!token); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
      // ... (esta función no cambia)
      setLoading(true);
      setError(null);
      try {
        const data = await apiLogin(email, password);
        setUser(data.user);
        setToken(data.token);
        setIsAuth(true);
        localStorage.setItem('token', data.token);
      } catch (err) {
        setError(err.message);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    // 2. AÑADE LA NUEVA FUNCIÓN REGISTER
    const register = async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        // Llamamos a la API simulada de registro
        await apiRegister(email, password); // Ya no asignamos 'data'
        
        // El registro fue exitoso, podríamos guardar el mensaje si quisiéramos
        // Opcional: podemos limpiar el error por si había uno anterior
        setError(null);
        
        // Devolvemos 'true' para indicar éxito
        return true; 
      } catch (err) {
        // Si la API simulada da error
        setError(err.message);
        // Devolvemos 'false' para indicar fracaso
        return false;
      } finally {
        setLoading(false);
      }
    };

    const logout = () => {
      // ... (esta función no cambia)
      console.log("Cierre de sesion exitoso");
      setUser(null);
      setToken(null);
      setIsAuth(false);
      localStorage.removeItem('token');
    }

    // 3. AÑADE 'register' AL VALOR
    const value = {
        isAuth,
        user,
        token,
        loading,
        error,
        login,
        register, // <-- Añadir aquí
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;