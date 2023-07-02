import * as api from "../api";
import { Link, json, useLoaderData } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import type { NurseStationDto } from "../api/model";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const nurseStations = await api.nurseStations.nurseStationsQuery(
      queryClient
    );
    return json(nurseStations);
  };

export const NurseStationsIndexPage = () => {
  const nurseStations = useLoaderData() as NurseStationDto[];

  return (
    <div>
      <ul>
        {nurseStations.map((nurseStation) => (
          <li key={nurseStation.id}>
            <Link to={`${nurseStation.id}`}>
              {nurseStation.name} - {nurseStation.comment}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
