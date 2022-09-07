import React from "react";
import cl from "./Loader.module.less";

const Loader = () => {
    const loadPic = Math.floor(Math.random() * 15);
    
    return (
        <>
            <img src={require("src/assets/images/" + loadPic + ".png")} />
        </>
    )
}

export default Loader;
