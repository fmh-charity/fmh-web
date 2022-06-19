import { useNavigate } from "react-router-dom";

export interface IAuth {
  accessToken: string;
}

class Auth {
  static checkAuth(): IAuth | null {
    const auth = localStorage.getItem("authorization");
    const navigate = useNavigate();

    if (auth !== null) {
      return JSON.parse(auth);
    }
    navigate("login");
    return null;
  }
}

export default Auth;
