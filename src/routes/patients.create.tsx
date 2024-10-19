import { json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";
import { PatientsCreate } from "../pages/patients-create";
import dayjs from "dayjs";
import { notification } from "../common/notifications";
import type { PatientCreateInfoDtoRq } from "../api/model";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    const {
      id,

      firstName,
      lastName,
      middleName,
      birthDate,
      dateIn,
      dateOut,
      status,

      intent,
    } = Object.fromEntries(formData);

    const data: PatientCreateInfoDtoRq = {
      firstName: firstName as string,
      lastName: lastName as string,
    };
    if (dayjs(dateIn as string).isValid()) {
      data.dateIn = dateIn as string;
    }
    if (dayjs(birthDate as string).isValid()) {
      data.birthDate = birthDate as string;
    }
    if (dayjs(dateOut as string).isValid()) {
      data.dateOut = dateOut as string;
    }

    if (status) {
      data.status = status as PatientCreateInfoDtoRq["status"];
    }

    if (middleName) {
      data.middleName = middleName as string;
    }

    data.dateInBoolean = true;

    const errors = {
      firstName: "",
      lastName: "",
      planExecuteDate: "",
      status: "",
      birthDate: "",
      dateIn: "",
    };
    if (!data.firstName) {
      errors.firstName = "Заполните поле";
    }
    if (!data.lastName) {
      errors.lastName = "Заполните поле";
    }
    if (!data.status) {
      errors.status = "Заполните поле";
    }
    if (!data.birthDate) {
      errors.birthDate = "Заполните поле";
    }
    if (!data.dateIn) {
      errors.dateIn = "Заполните поле";
    }
    if (Object.values(errors).some(Boolean)) return { errors };

    switch (intent) {
      case "CREATE": {
        const patient = await api.patients.patientCreateQuery(queryClient, data);

        if (patient.error) {
          notification.addNotification({
            label: (patient.error as { body: any }).body.code,
            text: (patient.error as { body: any }).body.message,
          });
        }
        break;
      }
      case "EDIT": {
        const patient = await api.patients.patientUpdateQuery(queryClient, data, id as string);

        if (patient.error) {
          notification.addNotification({
            label: (patient.error as { body: any }).body.code,
            text: (patient.error as { body: any }).body.message,
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
  (queryClient: QueryClient) => async () => {
    const [patients] = await Promise.all([
      api.patients.patientsQuery(queryClient, [
        "ACTIVE",
        "DISCHARGED",
        "EXPECTED",
      ]),
    ]);

    const patient = {};

    return json({ patient, patients });
  };

const requiredRoles: RolesType[] = [
  RolesType.ROLE_ADMINISTRATOR, 
  RolesType.ROLE_MEDICAL_WORKER,
  RolesType.ROLE_VOLUNTEER,
  RolesType.ROLE_VOLUNTEER_COORDINATOR
];

const PatientsCreateRouteComponent: React.FC = () => {
  return <PatientsCreate />;
};

export const PatientsCreateRoute = withRole(PatientsCreateRouteComponent, requiredRoles);