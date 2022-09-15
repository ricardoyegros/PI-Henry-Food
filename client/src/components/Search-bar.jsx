import React from "react";
import { useState } from "react";
import {findFromSearchBar} from "../redux/actions/";
import { useDispatch } from "react-redux";
import styles from "../components/styles/search-bar/search-bar.css"

export default function SearchBar({setPage}) {
  let [state, SetState] = useState("");
  let dispatch = useDispatch();

  function handleClickSearch(e) {
    dispatch(findFromSearchBar(state));
    SetState("");
  }
  function handleOnChange(e) {
    e.preventDefault();
    SetState(e.target.value);
  }
  return (
    <div>
      <input
        className="searchBarInput"
        type="text"
        value={state}
        placeholder="Find A Recipe By Name..."
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <button
        className="searchBarButton"
        type="submit"
        onClick={(e) => {
          handleClickSearch(e);
        }}
      >
        Search
      </button>
    </div>
  );
}
