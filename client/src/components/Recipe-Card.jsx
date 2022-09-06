import React from "react";
import {Link} from "react-router-dom";

export default function RecipeCard ({ name, image, diets,healthScore, dishTypes}) {
    return (
        <div className="recipe-card">
            <h2>{name}</h2>
            <img src={image}/>
            <p><b>Health-Score:</b> {healthScore}</p>
            <p><b>Diets:</b> {diets}</p>
            <p><b>Dishtypes:</b> {dishTypes}</p>
        </div>
    )
}