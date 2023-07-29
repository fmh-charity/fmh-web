import * as api from "../api";
import { json, redirect } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import type { NurseStationDtoRq } from "../api/model";
import { NurseStationsForm } from "../components/nurse-stations-form";
import { notification } from "../common/notifications";

export const action: api.CreateAction =
  (queryClient: QueryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { intent, id, name, comment } = Object.fromEntries(formData);

    console.log({ intent, id, name, comment });

    switch (intent) {
      case "CREATE":
        {
          const nurseStationCreate =
            await api.nurseStations.nurseStationCreateQuery(queryClient, {
              name,
              comment,
            } as NurseStationDtoRq);

          if (nurseStationCreate.error) {
            notification.addNotification({
              label: nurseStationCreate?.error?.code,
              text: nurseStationCreate?.error?.code,
            });
          } else {
            notification.addNotification({
              label: "Успешно",
              text: "пост создался",
            });
          }

          if (nurseStationCreate.body.id) {
            return redirect("/nursestations/" + nurseStationCreate.body.id);
          }
        }
        break;
      case "EDIT": {
        const nurseStationUpdate =
          await api.nurseStations.nurseStationUpdateQuery(
            queryClient,
            id as unknown as number,
            {
              name,
              comment,
            } as NurseStationDtoRq
          );

        if (nurseStationUpdate.error) {
          notification.addNotification({
            label: nurseStationUpdate?.error?.code,
            text: nurseStationUpdate?.error?.code,
          });
        } else {
          notification.addNotification({
            label: "Успешно",
            text: "пост сохранился",
          });
        }

        console.log({ nurseStationUpdate });
      }
    }

    return json("");
  };

export const NurseStationsCreatePage = () => {
  return (
    <NurseStationsForm
      intent="CREATE"
      title="NurseStationsCreatePage"
      buttonText="create nurse station"
      data={{ name: "", comment: "" }}
    />
  );
};
