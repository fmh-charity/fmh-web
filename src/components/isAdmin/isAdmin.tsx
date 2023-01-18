import { ReactElement } from "react";
import { useAppSelector } from "src/app/hooks";
import { selectUserInfo } from "src/features/auth/authSlice";

export const IsAdmin = ({ children }: { children: ReactElement }) => {
  const user = useAppSelector(selectUserInfo);
  return user && user.admin ? children : null;
};
