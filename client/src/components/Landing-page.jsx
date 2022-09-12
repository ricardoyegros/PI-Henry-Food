import React from "react";
import {Link} from "react-router-dom";
import styles from "../components/styles/landing-page/landing.css"
// - [ ] Alguna imagen de fondo representativa al proyecto
// - [ ] Botón para ingresar al home (`Ruta principal`)
import logo from "../assets/logo.png"
import photo from "../assets/background-landing-photo.jpg"
export default function LandingPage () {
    return (
        <div className="landing-page">
            <div className="nav">
            <Link to="/home-page">
            <img className="logo-landing" src={logo} />
            </Link>
            <Link to="/home-page" id="link-to-home-page">
                <button className="landing-page-button">Lets Go Cook!</button>
            </Link>
            </div>
            <div className="text-landing-page">
               <h2>Its not just another recipe website... <br/>its <span> HenryFood</span></h2>
               </div>
        </div>
    )
}