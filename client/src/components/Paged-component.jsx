import React from "react";

export default function PagedComponent ({recipesPerPage, allRecipes, pagedFunction}) {
    let totalPages = [];

    for (let i=1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        totalPages.push(i)
    }

    return (
        <div>
            {totalPages?.map(pages => (
                <button onClick={()=>pagedFunction(pages)} >{pages} </button>
            ))}
        </div>
    )
}