import React from "react";
import { Link} from "react-router-dom";
import './Navbar.css';

function Navbar(){
    return(
        <nav style={{padding: '1rem', backgroundColor: '#eee', marginBottom: '1rem'}}>
             <Link to="/" style={{marginRight: '1rem'}}>
             Linkveo (home)
             </Link>

             <Link to="/login">
             Iniciar sesión
             </Link>
             
        </nav>
    )
}

export default Navbar;