import React from "react";

export default function RecipeCard ({ id, name, image, diets, healthScore, dishTypes}) {
    return (
        <div className="recipe-card">
            <h2>{name}</h2>
            <img src={image || ""}/>
            <p><b>Health-Score:</b> {healthScore|| ""}</p>
            {<p><b>Diets:</b> {diets?.map((diet, i) => <p key={i}>{diet.name|| diet}</p>)}</p>}
            <p><b>Dishtypes:</b> {dishTypes|| ""}</p> 
        </div>
    )
}