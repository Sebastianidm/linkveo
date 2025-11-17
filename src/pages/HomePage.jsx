import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiGetLinks, apiCreateLink } from '../services/linkService';

export default function HomePage() {
  const { user, token } = useAuth(); 
  const [links, setLinks] = useState([]);
  const [linkUrl, setLinkUrl] = useState('');
  
  const [isFetching, setIsFetching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Cargar links al inicio
  useEffect(() => {
    const fetchLinks = async () => {
      setIsFetching(true);
      try {
        const fetchedLinks = await apiGetLinks(token);
        setLinks(fetchedLinks);
      } catch (err) {
        // Error al cargar links - se podría mostrar al usuario en el futuro
        console.error('Error al cargar links:', err.message);
      } finally {
        setIsFetching(false);
      }
    };

    if (token) fetchLinks();
  }, [token]);

  // Crear nuevo link
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!linkUrl) return;

    setIsCreating(true);
    setCreateError(null);
    try {
      const newLink = await apiCreateLink(linkUrl, token);
      setLinks((prev) => [...prev, newLink]);
      setLinkUrl('');
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <div className="min-h-screen bg-[#F5F5F7] pb-20">
      
      {/* SECCIÓN HERO / ENCABEZADO */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Hola, {user?.email?.split('@')[0] || 'Usuario'} 👋
        </h1>
        <p className="text-lg text-gray-500">
          Organiza tu mundo digital. Guarda lo que importa.
        </p>
      </div>

      {/* SECCIÓN DEL INPUT (FLOTANTE) */}
      <div className="max-w-2xl mx-auto px-6 mb-16">
        <form onSubmit={handleSubmit} className="relative group">
          {/* Efecto de sombra suave detrás */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
          
          <input 
            type="url"
            className="relative block w-full rounded-full border-0 py-5 pl-8 pr-36 text-gray-900 shadow-xl shadow-blue-900/5 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0071e3] text-lg bg-white/80 backdrop-blur-xl transition-all"
            placeholder="Pega un enlace aquí (https://...)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            required
          />
          
          {/* Botón "Añadir" dentro del input */}
          <button 
            type="submit" 
            disabled={isCreating}
            className="absolute right-2 top-2 bottom-2 rounded-full bg-[#1d1d1f] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-70 transition-all"
          >
            {isCreating ? 'Guardando...' : 'Guardar'}
          </button>
        </form>

        {/* Mensaje de error del formulario */}
        {createError && (
          <p className="mt-3 text-center text-sm text-red-500 font-medium animate-pulse">
            {createError}
          </p>
        )}
      </div>

      {/* GRID DE ENLACES */}
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Estado de Carga de la lista */}
        {isFetching && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Lista vacía */}
        {!isFetching && links.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 text-lg">Aún no tienes enlaces guardados.</p>
          </div>
        )}

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative block bg-white rounded-3xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                {/* Icono decorativo (placeholder) */}
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                
                {/* Flechita de "ir" */}
                <div className="text-gray-300 group-hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-gray-400 truncate font-medium">
                {link.url}
              </p>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}