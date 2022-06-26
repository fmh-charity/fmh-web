import React, { KeyboardEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import {
  useLazyUserInfoQuery,
  useLoginMutation,
} from "src/services/api/authApi";
import styles from "./Login.module.less";

const Login = () => {
  const auth = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [getUserInfo] = useLazyUserInfoQuery();
  const location = useLocation();
  const navigate = useNavigate();
  let { from: path } = (location.state as { from: string }) || {};

  if (path) {
    path = path.includes("login") ? "/" : path;
  } else {
    path = "/";
  }
  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  async function onSubmit() {
    try {
      await login({ login: userName, password }).unwrap();
      await getUserInfo();
      navigate(`${path}`);
    } catch (err) {
      console.log(err);
    }
  }

  return !auth.user ? (
    <div className={styles.grid}>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={keyPressSubmit}
          maxLength={25}
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={keyPressSubmit}
          maxLength={25}
        />
        <button
          disabled={isLoading}
          className={styles.button}
          type="button"
          onClick={onSubmit}
        >
          Войти
        </button>
      </form>
    </div>
  ) : (
    <Navigate to={path} />
  );
};

export default Login;
