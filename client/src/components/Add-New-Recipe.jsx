import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDiets,
  getRecipies,
  addNewRecipetoReducer,
} from "../redux/actions";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import styles from "../components/styles/form-add-recipe/form.css";

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
    diets: [],
  });
  let [error, setError] = useState({});
  let dispatch = useDispatch();
  let typeDiets = useSelector((state) => state.allDiets);

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
        alert("The input 'Healthscore' must be a number beetween 0-100");
      }
    }
    if (!form.image) {
      errorsToShow.image = "Please Upload a URL Image"
    } else {
      let regexImage = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
      if (!regexImage.test(form.image)) {
        errorsToShow.image = "The image must be a URL";
      }
    }

    if(!form.steps){
      errorsToShow.steps = "Please Complete the Steps Input"
    }
    if(form.diets.length === 0){
      errorsToShow.diets = "Please Select Almost One Type Of Diet"
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
    if (form.diets.indexOf(e.target.value) !== -1) {
      setForm((form) => ({
        ...form,
        diets: form.diets.splice(form.diets.indexOf(e.target.value), 1),
      }));
    } else {
      setForm((form) => ({
        ...form,
        diets: [...form.diets, e.target.value],
      }));
    }
  }

  function handleSubmit(e) {
    if (error.name || error.summary || error.healthScore || error.steps || error.image || form.diets.length===0) {
      alert("Please complete all Inputs");
      e.preventDefault();
    } else {
      dispatch(addNewRecipetoReducer(form));
      dispatch(getRecipies());
      alert("El formulario se ha enviado");
    }
  }

  return (
    <div className="div-form">
      <nav className="nav-bar-form">
        <Link to="/home-page">
          <img className="logo-detail" src={logo} />
        </Link>
      </nav>
      <div className="form">
        <h1><u>Create and Share Your Own Recipe</u></h1>
        <form onSubmit={handleSubmit}>
        <div className="start-form">
          <label className="name"><u><b>Name:</b></u> </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          {error.name ? <p>{error.name}</p> : ""}

          <label><u><b>Summary:</b></u> </label>
          <textarea
            cols="2"
            rows="8"
            className="text-area"
            id="summary"
            name="summary"
            type="text"
            value={form.summary}
            onChange={handleChange}
          />
          {error.summary ? <p>{error.summary}</p> : ""}

          <label><u><b>Healthscore:</b></u> </label>
          <input
            id="healthScore"
            name="healthScore"
            type="text"
            value={form.healthScore}
            onChange={handleChange}
          />
          {error.healthScore ? <p>{error.healthScore}</p> : ""}

          <label><u><b>Steps:</b></u></label>
          <textarea
            className="text-area"
            cols="2"
            rows="8"
            id="steps"
            name="steps"
            type="text"
            value={form.steps}
            onChange={handleChange}
          />
          {error.steps ? <p>{error.steps}</p> : ""}
          </div>
          <label><u><b>Diets:</b></u></label>
          {typeDiets.map((el) => {
            return (
              <div>
                <p>{el.name}</p>
                <input
                  type="checkbox"
                  name={el.name}
                  value={el.name}
                  onChange={(e) => handleChecked(e)}
                />
              </div>
            );
          })}
          <p>
            <b>{form.diets.toString()}</b>
          </p>
          {!form.diets ? <p><b><u>{error.diets}</u></b></p> : ""}
          <label>Upload your image here : </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          {error.image ? (
            <p>
              <b>{error.image}</b>
            </p>
          ) : (
            ""
          )}
          <div>
          <input className="submit-button" type="submit" value="Create Your Own Recipe" />
          </div>
        </form>
      </div>
      <div >
        <Link to="/home-page">
          <button className="button-back-form">Go Back to Home-Page</button>
        </Link>
      </div>
    </div>
  );
}
