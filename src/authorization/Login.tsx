import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export interface LoginPassword {
  login: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation((loginPassword: LoginPassword) =>
    fetch("http://localhost:8080/fmh/authentication/login", {
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
    <div>
      <input
        type="text"
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        type="button"
        onClick={() => {
          mutation.mutate({ login, password });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
