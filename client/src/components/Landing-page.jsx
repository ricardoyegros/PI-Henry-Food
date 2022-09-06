import React from "react";
import {Link} from "react-router-dom";

// - [ ] Alguna imagen de fondo representativa al proyecto
// - [ ] Botón para ingresar al home (`Ruta principal`)

export default function LandingPage () {
    return (
        <div className="landing-page">
            <h1 className="text-landing-page">
                Hola mucho gusto aqui en HenryFood seremos tus mejores aliados a la hora de cocinar, brindandote las mejores recetas
            </h1>
            <Link to="/home-page" id="link-to-home-page">
                <button className="landing-page-button">Comencemos Ahora!</button>
            </Link>
        </div>
    )
}