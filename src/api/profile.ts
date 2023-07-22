import * as api from "../api";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import type { ProfileChangingRequest } from "./model";
import { PROFILE_SAVE_CHANGES_QUERY } from "../common/constants";

export const saveChangesQuery = (
  queryClient: QueryClient,
  data: ProfileChangingRequest,
  id: number
) =>
  createQuery<undefined, ProfileChangingRequest>(
    queryClient,
    `/api/fmh/users/${id}`,
    api.requestInit.RequestInitPutJSON,
    {
      queryKey: [PROFILE_SAVE_CHANGES_QUERY]
    },
    data
  );
