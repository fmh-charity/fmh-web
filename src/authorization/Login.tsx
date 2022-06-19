import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.less";
import AP from "../config/ApplicationProperties";

export interface LoginPassword {
  login: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation((loginPassword: LoginPassword) =>
    fetch(`${AP.HOST}/fmh/authentication/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPassword),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.accessToken !== null) {
          localStorage.setItem("authorization", JSON.stringify(res));
          navigate("/", { replace: true });
        }
      })
  );

  return (
    <div className={styles.grid}>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          maxLength={25}
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          maxLength={25}
        />
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            mutation.mutate({ login, password });
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
