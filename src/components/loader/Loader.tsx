import React from "react";
import cl from "./Loader.module.less";

const Loader = () => {
    const loadPic = Math.floor(Math.random() * 14) + 1;

    return (
        <div className="page__wrapper">
            <img src={require("src/assets/images/" + loadPic + ".png")} />
        </div>
    )
}

export default Loader;
