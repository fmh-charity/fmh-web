import * as api from "../api";
import { json, useLoaderData } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import { NurseStationsForm } from "../components/nurse-stations/NurseStationForm";
import type { NurseStationDto } from "../api/model";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: any }) => {
    const nurseStations = await api.nurseStations.nurseStationByIdQuery(
      queryClient,
      params.id
    );
    return json(nurseStations);
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
