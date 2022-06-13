import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ModalWindow from "src/components/modalWindow/ModalWindow";

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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border-t border-emerald-600 rounded shadow-lg shadow-emerald-800/50 lg:max-w-md">
        <form className="mt-6">
          <div>
            <label htmlFor="login" className="block text-sm text-gray-800">
              Login/Email
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-emerald-700 bg-white border rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              onChange={(e) => setLogin(e.target.value)}
              maxLength={25}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Password
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-emerald-700 bg-white border rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              maxLength={25}
            />
          </div>
          <a href="/login" className="text-xs text-gray-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-emerald-700 rounded-md hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600"
              type="button"
              onClick={() => {
                mutation.mutate({ login, password });
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
