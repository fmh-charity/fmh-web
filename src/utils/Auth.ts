import { useNavigate } from "react-router-dom";

export interface Authorization {
  accessToken: string;
  refreshToken: string;
}

class Auth {
  static checkAuth(): Authorization | null {
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
