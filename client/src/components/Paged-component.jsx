import React from "react";

export default function PagedComponent ({recipesPerPage, allRecipes, pagedFunction}) {
    let totalPages = [];

    for (let i=1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        totalPages.push(i)
    }

    return (
        <div className="paged-container">
            {totalPages?.map(pages => (
                <button className="paged-button" onClick={()=>pagedFunction(pages)} >{pages} </button>
            ))}
        </div>
    )
}