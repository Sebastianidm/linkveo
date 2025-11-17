// src/services/linkService.js

// En un futuro, esta sería la URL real de tu backend
// const API_URL = 'http://localhost:8000/api/links';

// --- SIMULACIÓN ---
// Vamos a simular una base de datos de enlaces en memoria
let mockLinks = [
  { id: 1, url: 'https://google.com', title: 'Google' },
  { id: 2, url: 'https://github.com', title: 'GitHub' },
];
let nextId = 3;

// Simulación de la función para OBTENER todos los enlaces
export const apiGetLinks = async (token) => {
  console.log("Llamando a la API (simulada) para obtener enlaces...", { token });

  // Simulamos una espera de 0.5 segundos
  await new Promise(resolve => setTimeout(resolve, 500));

  // Devolvemos una copia de los enlaces simulados
  return [...mockLinks];
};

// Simulación de la función para CREAR un enlace
export const apiCreateLink = async (url, token) => {
  console.log("Llamando a la API (simulada) para crear enlace...", { url, token });

  // Simulamos una espera de 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulamos una validación simple
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error("URL inválida (simulado)");
  }

  // Creamos el nuevo enlace
  const newLink = {
    id: nextId++,
    url: url,
    title: `Enlace a ${url.substring(0, 20)}...` // Título simulado
  };

  // Lo añadimos a nuestra "base de datos" simulada
  mockLinks.push(newLink);

  // Devolvemos el enlace recién creado
  return newLink;
};

// (Aquí podríamos añadir 'apiDeleteLink', 'apiUpdateLink', etc.)