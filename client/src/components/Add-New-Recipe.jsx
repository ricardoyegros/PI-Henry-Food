import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {getAllDiets, getRecipies, addNewRecipetoReducer} from "../redux/actions"
import {Link} from "react-router-dom"

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

export default function AddNewRecipe() {
  let [form, setForm] = useState({
    diets: []
  });
  let [error, setError] = useState({});
  let dispatch = useDispatch();
  let typeDiets = useSelector(state => state.allDiets)
  
  useEffect(() => {
    dispatch(getAllDiets());
}, [dispatch]);

  function errorValidator(form) {
    let errorsToShow = {};
    if (!form.name) {
      errorsToShow.name = "Please complete the input 'Name' to continue";
    } else {
      let regexValidator = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
      if (!regexValidator.test(form.name)) {
        errorsToShow.name =
          "The input 'Name' dont be a number o especial character";
      }
    }
    if (!form.summary) {
      errorsToShow.summary = "Please complete the input 'Summary' to continue";
    }
    if (form.healthScore) {
      let regexValidatorToHealthScore = /^([0-9])*$/;
      if (
        !regexValidatorToHealthScore.test(form.healthScore) ||
        form.healthScore < 0 ||
        form.healthScore > 100
      ) {
        errorsToShow.healthScore =
          "The input 'Healthscore' must be a number beetween 0-100";
          alert("The input 'Healthscore' must be a number beetween 0-100")
      }
    }
    if(form.image){
      let regexImage = /(.jpg|.jpeg|.png|.gif)$/i
      if(!regexImage.test(form.image)){
        errorsToShow.image =
        "the file extension must be .jpg|.jpeg|.png|.gif"
        alert("the file extension must be .jpg|.jpeg|.png|.gif")
      }
    }
    return errorsToShow;
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(
      errorValidator({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChecked(e) {
    e.preventDefault();
    if(form.diets.indexOf(e.target.value) !== -1){
      setForm((form) => ({
        ...form,
        diets: form.diets.splice(form.diets.indexOf(e.target.value),1)
      }))
    }else {
      setForm((form) => ({
        ...form,
        diets: [...form.diets, e.target.value]
      }))
    }
  }

  function handleSubmit(e) {
    //console.log(form)
    e.preventDefault();
    if (error.name || error.summary) {
      alert("The inputs 'name' && 'summary' dont must be incomplete");
    } else {
      dispatch(addNewRecipetoReducer(form));
      dispatch(getRecipies())
      alert("El formulario se ha enviado");
    }
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
        {error.name ? <p>{error.name}</p> : ""}
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
        {error.summary ? <p>{error.summary}</p> : ""}
        <br />
        <br />
        <label>Healthscore: </label>
        <input
          id="healthScore"
          name="healthScore"
          type="text"
          value={form.healthScore}
          onChange={handleChange}
        />
        {error.healthScore ? <p>{error.healthScore}</p> : ""}
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
        {typeDiets.map(el=>{
          return(
            <div>
              <p>{el.name}</p>
              <input type="checkbox" name={el.name} value={el.name} onChange={e=> handleChecked(e)}/>
            </div>
          )
        })}
        <p><b>{form.diets.toString()}</b></p>
        <br />
        <br />
        <label>Upload your image here : </label>
        <input type="file" name="image" value={form.image} onChange={handleChange}/>
        {error.image ? <p><b>{error.image}</b></p> : ""}
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>
      <br />
        <br />
      <Link to="/home-page">
        <button>Go Back to Home=Page</button>
      </Link>
    </div>
  );
}
