import type { QueryClient } from "@tanstack/react-query";
import { json } from "react-router-dom";

import * as api from "../api";
import type { ProfileChangingRequest } from "../api/model";
import { ensureUserInfo } from "../common/auth";

import { Profile } from "../pages/profile";
import { assertObjectBySchema } from "../common/utils";
import { profileMainSchema } from "../validation/profile";

export const action: api.CreateAction =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    try {
      const formData = await request.formData();

      const { lastName, firstName, middleName, dateOfBirth, email, roleIds } =
        Object.fromEntries(formData);

      const formObj = {
        lastName,
        firstName,
        middleName,
        dateOfBirth,
        email,
        roleIds: [parseInt(roleIds as string, 10)],
      } as unknown as ProfileChangingRequest;

      const schemaErrors = assertObjectBySchema(formObj, profileMainSchema);
      if (schemaErrors) return json(schemaErrors);

      const userInfo = await ensureUserInfo(queryClient);

      if (!userInfo?.id) {
        throw new Error("Произошла ошибка");
      }

      const responseSaveReq = await api.profile.saveChangesQuery(
        queryClient,
        formObj,
        userInfo.id
      );

      if (responseSaveReq.error) {
        throw new Error("Произошла ошибка");
      }

      return json(responseSaveReq.body);
    } catch (error) {
      return json(error as any);
    }
  };

export const ProfileRoute = () => {
  return <Profile />;
};
