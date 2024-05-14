import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { WishesId } from "../pages/wishes-id";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getArrayFromFormData } from "../common/utils";
import type { WishCreationRequest } from "../api/model";
import { notification } from "../common/notifications";

dayjs.extend(utc);

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const wishVisibility = getArrayFromFormData(formData, "wishVisibility").map(
      (i) => parseInt(i as string, 10)
    );

    const {
      title,
      description,
      planExecuteDate,
      patient,
      id,
      intent,
    } = Object.fromEntries(formData);
    const o: WishCreationRequest = {
      title: title as string,
    };
    if (dayjs(planExecuteDate as string).isValid()) {
      o["planExecuteDate"] = dayjs.utc(planExecuteDate as string).toJSON();
    }
    if (patient) {
      o["patientId"] = parseInt(patient as string, 10);
    }
    if (wishVisibility.length) {
      o["wishVisibility"] = wishVisibility;
    }
    if (description) {
      o["description"] = description as string;
    }

    const errors = {
      title: "",
      description: "",
      planExecuteDate: "",
    };
    if (!o.title) {
      errors.title = "Заполните поле";
    }
    if (!o.description) {
      errors.description = "Заполните поле";
    }
    if (!o.planExecuteDate) {
      errors.planExecuteDate = "Заполните поле";
    }

    if (Object.values(errors).some(Boolean)) return { errors };

    switch (intent) {
      case "CREATE": {
        const wish = await api.wishes.wishesCreateQuery(queryClient, o);
        if (wish.error) {
          notification.addNotification({
            label: (wish.error as { body: any }).body.code,
            text: (wish.error as { body: any }).body.message,
          });
        }
        break;
      }
      case "EDIT": {
        const wish = await api.wishes.wishesUpdateQuery(
          queryClient,
          o,
          id as string
        );
        if (wish.error) {
          notification.addNotification({
            label: (wish.error as { body: any }).body.code,
            text: (wish.error as { body: any }).body.message,
          });
        } else {
          notification.addNotification({
            label: "Просьба",
            text: "успешно сохранена",
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
  (queryClient: QueryClient) =>
  async ({ params }) => {
    if (params.id) {
      const [wish, patients, users] = await Promise.all([
        api.wishes.wishesByIdQuery(queryClient, params.id),
        api.patients.patientsQuery(queryClient, [
          "ACTIVE",
          "DISCHARGED",
          "EXPECTED",
        ]),
        api.users.usersQuery(queryClient),
      ]);

      return json({ wish, patients, users });
    }
  };

export const WishesIdRoute = () => {
  return <WishesId />;
};
