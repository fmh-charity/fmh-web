import type { ComponentType } from "react";
import React from "react";
import { Navigate } from "react-router-dom";

import { ensureUserInfo } from "../common/auth";
import type { RolesType } from "../common/roles";

export function withRole<P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredRoles: RolesType[]
) {
  const ComponentWithRole: React.FC<P> = (props) => {
    const userInfo = ensureUserInfo();

    if (!userInfo?.roles) {
      // Пользователь не авторизован
      return <Navigate to="/login" replace />;
    }

    const hasRequiredRole = requiredRoles.some((role) => userInfo?.roles?.includes(role));
    if (!hasRequiredRole) {
      // У пользователя нет необходимой роли
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithRole;
}
