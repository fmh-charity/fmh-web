import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPassword } from "src/authorization/Login";

interface IAccessRefreshToken {
  accessToken: string;
  refreshToken: string;
}

interface IAuthError {
  code: string;
  message: string;
}

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const auth = localStorage.getItem("authorization");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate("/login");
    } else {
      if (auth.includes("code")) {
        const authError: IAuthError = JSON.parse(auth);
        console.log(authError);
      } else {
        const authAccess: IAccessRefreshToken = JSON.parse(auth);
        if (!checkAccessToken(authAccess)) {
          navigate("/login");
        }
      }
    } 
  }, []);

  return children;
};

function checkAccessToken(auth: IAccessRefreshToken): boolean {
  return true;
}

export default CheckAuth;
