import { useNavigate } from "react-router-dom";
import Auth from "src/utils/Auth";
import AP from "../config/ApplicationProperties";


export interface IClaims {
  createDate: string;
  creatorId: number;
  creatorName: string;
  description: string;
  executorId: number;
  executorName: string;
  factExecuteDate: string;
  id: number;
  planExecuteDate: string;
  status: string;
  title: string;
}

class ClaimsService{
  static getClaims(setClaims: Function): Error | null {
    const navigate = useNavigate();
    const auth = Auth.checkAuth();

    if (auth !== null) {
      fetch(`${AP.HOST}/fmh/claims`, {headers: {authorization: auth.accessToken}}).then(
        async (res) => {
          if (!res.ok) {
            return new Error(res.statusText);
          } else {
            setClaims(await res.json());
            return null;
          }
        })
    } else {

    }

    return null;
  }


}

export default ClaimsService;
