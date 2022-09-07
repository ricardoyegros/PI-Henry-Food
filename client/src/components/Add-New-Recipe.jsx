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

// function validatorFunction(something) {
//   let someError = {};
//   if (!something.name ) someError.name = "Dont forget complete the recipe name";
//   if (!something.summary)
//     someError.summary = "Dont forget complete the summary section";
//   if (
//     !typeof something.healthScore === "Number" ||
//     !something.healthScore >= 0 ||
//     !something.healthScore <= 100
//   )
//     someError.healthScore =
//       "Dont forget the healthScore must be a 'Number' beetween 0 - 100";
// }

export default function AddNewRecipe() {
  let [form, setForm] = useState({});

  function handleChange(e) {
    setForm({
        ...form,
        [e.target.name]: e.target.value})}
  //     
  //     let newStateToValidate = validatorFunction(newState)
  //     setErrors(newStateToValidate)
  //     return newState
  //   });
  function handleSubmit(e) {
    e.preventDefault();
    alert("El formulario se ha enviado")
  }
  return (
    <div>
      <h1>Create and Share Your Own Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Summary: </label>
        <textarea
          id="summary"
          name="summary"
          type="text"
          value={form.summary}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Healthscore: </label>
        <input
          id="healthScore"
          name="healthScore"
          type="number"
          min="0"
          max="100"
          value={form.healthScore}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Steps:</label>
        <textarea
          id="steps"
          name="steps"
          type="text"
          value={form.steps}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Diets:</label>
        <input
          id="diets"
          name="diets"
          type="text"
          value={form.diets}
          onChange={handleChange}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
