import type * as api from "../api";
import { Link, Outlet } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    return "";
  };

  //TODO: сделать страницу палат!
  
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


const requiredRoles: RolesType[] = [RolesType.ROLE_ADMINISTRATOR, RolesType.ROLE_MEDICAL_WORKER];

const NurseStationsRouteComponent: React.FC = () => {
  return <NurseStationsRoute />;
};

export const PatientsIdRoute = withRole(NurseStationsRouteComponent, requiredRoles);