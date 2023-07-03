import * as api from "../api";
import { json, useLoaderData } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import { NurseStationsForm } from "../components/nurse-stations/NurseStationForm";
import type { NurseStationDto } from "../api/model";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    if (params.id) {
      const nurseStation = await api.nurseStations.nurseStationByIdQuery(
        queryClient,
        params.id
      );
      return json(nurseStation.body);
    } else {
      return json({ error: "nursestations.index no id provided" });
    }
  };

export const NurseStationsIdPage = () => {
  const nurseStation = useLoaderData() as NurseStationDto;
  return (
    <NurseStationsForm
      intent="EDIT"
      title="NurseStationsIdPage"
      buttonText="update nurse station"
      data={nurseStation}
    />
  );
};
