import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useLoginMutation } from "src/services/api/authApi";
import styles from "./Login.module.less";

const Login = () => {
  const auth = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  return !auth.user ? (
    <div className={styles.grid}>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          maxLength={25}
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          maxLength={25}
        />
        <button
          disabled={isLoading}
          className={styles.button}
          type="button"
          onClick={async () => {
            try {
              await login({ login: userName, password }).unwrap();
              // navigate("/");
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Войти
        </button>
      </form>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Login;
