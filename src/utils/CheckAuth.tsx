export interface IAccessRefreshToken {
  accessToken: string;
  refreshToken: string;
}

interface IAuthError {
  code: string;
  message: string;
}

const CheckAuth = ({ children }: { children: JSX.Element }) => {

  return children;
};

function checkAccessToken(auth: IAccessRefreshToken): boolean {
  return true;
}

export default CheckAuth;
