import React from "react";
import dish from "../assets/dish.jpg"
import styles from "../components/styles/loader/loader.css"
export default function Loader () {
    return (
        <div className="loader-container">
            <img className="dish-loader" src={dish} />
        </div>
    )
}