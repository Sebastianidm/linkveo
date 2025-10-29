import React, {useState} from 'react';
import './LoginPage.css';

function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log('Datos de registro:', {email, password});
    }


    return(
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Crear cuenta</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                        <input 
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        />
                </div>

                <div className="form-group">
                    <label htmlFor='confirmPassword'>Confirmar contraseña</label>
                    <input 
                    type="password"
                    id= "confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type='submit' className='login-button'>
                    Registrarse
                </button>
            </form>
        </div>
    )
}


export default RegisterPage;