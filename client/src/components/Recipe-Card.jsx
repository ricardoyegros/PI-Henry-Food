import React from "react";
import style from "../components/styles/recipe-card/card.css"

export default function RecipeCard ({ name, image, diets, healthScore, dishTypes}) {
    return (
        <div className="recipe-card">
            <h2 className="card-name"><u>{name}</u></h2>
            <img alt="No se pudo cargar la imagen" src={image || "" } className="card-img" />
            <p className="card-dish-types"><b><u>Dishtypes:</u></b> {dishTypes|| ""}</p> 
            <p className="card-score"><b><u>Health-Score:</u></b> {healthScore|| ""}</p>
            <b><u>Diets:</u></b> {diets?.map((diet, i) => <p className="card-diets" key={i}>{diet.name|| diet}</p>)}
        </div>
    )
}