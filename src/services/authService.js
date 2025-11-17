// src/services/authService.js
//import axios from 'axios';

// En un futuro, esta sería la URL real de tu backend
// const API_URL = 'http://localhost:8000/api/auth'; 

// --- SIMULACIÓN ---
// Vamos a simular que la API tarda 1 segundo en responder

// Simulación de la función de Login
export const apiLogin = async (email, password) => {
  console.log("Llamando a la API (simulada) para login...", { email, password });
  
  // Simulamos una espera de 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000)); 

  // Simulamos una respuesta exitosa del backend
  if (email === "test@test.com") {
    // Si el login es exitoso, devolvemos un token y datos de usuario (simulados)
    return {
      token: "jwt-token-simulado-123456",
      user: {
        id: 1,
        email: "test@test.com",
        name: "Usuario de Prueba"
      }
    };
  } else {
    // Si el login falla (ej. mal email), lanzamos un error
    throw new Error("Credenciales inválidas (simulado)");
  }
};

// Simulación de la función de Registro
export const apiRegister = async (email, password) => {
  console.log("Llamando a la API (simulada) para registro...", { email, password });
  
  // Simulamos una espera de 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulamos una respuesta exitosa
  return {
    message: "Usuario registrado exitosamente"
  };
};

// --- CÓDIGO REAL (para el futuro) ---
// Así se vería una llamada real con axios
/*
export const apiLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password
  });
  return response.data; // { token, user }
};
*/