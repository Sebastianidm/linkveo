import React, {useState} from "react";
import './LoginPage.css';

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos invalidos', {email, password});
    }

    return(
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            value={email} // El valor del input está "atado" al estado
            onChange={(e) => setEmail(e.target.value)} // Cuando cambia, actualiza el estado
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password"
            value={password} // El valor del input está "atado" al estado
            onChange={(e) => setPassword(e.target.value)} // Cuando cambia, actualiza el estado
            required 
          />
        </div>

        <button type="submit" className="login-button">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;