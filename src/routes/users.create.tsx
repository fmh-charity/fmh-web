import { json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";
import { UsersCreate } from "../pages/users-create";
import { notification } from "../common/notifications";
import type { RegistrationRequest, ProfileChangingRequest } from "../api/model";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    
    const {
      id,
      firstName,
      lastName,
      middleName,
      roleIds,
      dateOfBirth,
      email,
      password,
      intent,
    } = Object.fromEntries(formData);

    const data: RegistrationRequest = {
      firstName: firstName as string,
      lastName: lastName as string,
      middleName: middleName as string,
      dateOfBirth: dateOfBirth as string,
      roleIds: [Number(roleIds)] as number[],
      email: email as string,
      password: password as string,
    };

    if (middleName) {
      data.middleName = middleName as string;
    }

    const errors = {
      firstName: "",
      lastName: "",
      planExecuteDate: "",
      status: "",
      birthDate: "",
      dateIn: "",
      email: "",
      password: "",
    };
    if (!data.firstName) {
      errors.firstName = "Заполните поле";
    }
    if (!data.lastName) {
      errors.lastName = "Заполните поле";
    }
    if (!data.email) {
      errors.email = "Заполните поле";
    }
    if (!data.password) {
      errors.password = "Заполните поле";
    }
    if (!data.dateOfBirth) {
      errors.birthDate = "Заполните поле";
    }
    if (Object.values(errors).some(Boolean)) return { errors };

    switch (intent) {
      case "CREATE": {
        const user = await api.authentication.registrationQuery(queryClient, data);


      console.log(data, 'data!!!')

        if (user.error) {
          notification.addNotification({
            label: (user.error as { body: any }).body.code,
            text: (user.error as { body: any }).body.message,
          });
        }
        break;
      }
      case "EDIT": {
        const user = await api.users.updateUserByIdQuery(queryClient, data as ProfileChangingRequest, id as string);

        if (user.error) {
          notification.addNotification({
            label: (user.error as { body: any }).body.code,
            text: (user.error as { body: any }).body.message,
          });
        } else {
          notification.addNotification({
            label: "Пользователь",
            text: "успешно сохранен",
          });
        }
        break;
      }
      default:
        break;
    }

    return json({ result: "ok" });
  };

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const [users] = await Promise.all([
      api.users.usersQuery(queryClient),
    ]);

    const user = {};

    return json({ user, users });
  };

const requiredRoles: RolesType[] = [
  RolesType.ROLE_ADMINISTRATOR, 
];

const UsersCreateRouteComponent: React.FC = () => {
  return <UsersCreate />;
};

export const UsersCreateRoute = withRole(UsersCreateRouteComponent, requiredRoles);