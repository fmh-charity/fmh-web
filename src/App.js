import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./AppRouter";
import Header from './components/header/Header';
import Navbar from "./components/navbar/Navbar";
import style from "./App.module.css";
import "./normalize.css";

function App() {
  return (
    <BrowserRouter>
      <div className={`${style.wrapper} ${style['base-colors']}` }>
        <Header />
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
