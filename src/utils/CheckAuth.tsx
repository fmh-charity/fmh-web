import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const auth = localStorage.getItem("authorization");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default CheckAuth;
