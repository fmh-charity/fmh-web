import * as api from "../api";
import { Link, Outlet, json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";

export const loader = (queryClient: QueryClient) => async () => {
  return "";
};

export const NurseStationsRoute = () => {
  return (
    <div>
      nurse stations
      <div>
        <ul>
          <Link to="create">create nurse station</Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
