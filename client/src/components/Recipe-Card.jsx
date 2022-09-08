import React from "react";
import {Link} from "react-router-dom";

export default function RecipeCard ({ id, name, image, diets,healthScore, dishTypes}) {
    console.log(name, image, diets,healthScore, dishTypes)
    return (
        <div className="recipe-card">
            {{id}?" ": ""}
            <h2>{name}</h2>
            <img src={image || ""}/>
            <p><b>Health-Score:</b> {healthScore|| ""}</p>
            {<p><b>Diets:</b> {diets?.map((diet, i) => <p key={i}>{diet.name|| diet}</p>)}</p>}
            <p><b>Dishtypes:</b> {dishTypes|| ""}</p> 
        </div>
    )
}