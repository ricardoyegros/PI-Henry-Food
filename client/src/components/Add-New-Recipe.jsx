import React from "react";
import { useState } from "react";

// __Ruta de creación de recetas__: debe contener

// - [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
//   - Nombre
//   - Resumen del plato
//   - Nivel de "comida saludable" (health score)
//   - Paso a paso
// - [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// - [ ] Botón/Opción para crear una nueva receta

// > Es requisito que el formulario de creación esté validado con JavaScript
//  y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren.
//  Por ejemplo: Que el nombre de la receta no pueda contener símbolos,
//  que el health score no pueda exceder determinado valor, etc.

function validatorFunction(something) {
  let someError = {};
  if (!something.name ) someError.name = "Dont forget complete the recipe name";
  if (!something.summary)
    someError.summary = "Dont forget complete the summary section";
  if (
    !typeof something.healthScore === "Number" ||
    !something.healthScore >= 0 ||
    !something.healthScore <= 100
  )
    someError.healthScore =
      "Dont forget the healthScore must be a 'Number' beetween 0 - 100";
}

export default function AddNewRecipe() {
  let [state, setState] = useState({
    name: ""
  });
  let [errors, setErrors] = useState({})
  function handleChange(e) {
    e.preventDefault();
    setState((prevState) => {
      let newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      }
      let newStateToValidate = validatorFunction(newState)
      setErrors(newStateToValidate)
      return newState
    });
  }

  return (
    <div>
      <h1>Create and Share Your Own Recipe</h1>
      <form>
        <label>Name: </label>
        <input
          name="name"
          type="text"
          value={state.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <br />
        <label>Summary: </label>
        <textarea />
        <br />
        <br />
        <label>Healthscore: </label>
        <input />
        <br />
        <br />
        <label>Steps:</label>
        <textarea />
        <br />
        <br />
        <label>Diets:</label>
        <input />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
