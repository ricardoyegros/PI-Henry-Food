import React from "react";
import {Link} from "react-router-dom";

// - [ ] Alguna imagen de fondo representativa al proyecto
// - [ ] Botón para ingresar al home (`Ruta principal`)

export default function LandingPage () {
    return (
        <div className="landing-page">
            <h1 className="text-landing-page">
                Hola soy un h1 de prueba
            </h1>
            <Link to="/home" id="landing-page-link">
                <button className="landing-page-button">Hola soy un boton de prueba</button>
            </Link>
        </div>
    )
}