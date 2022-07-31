import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface IPatient {
  birthDate: number;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
}

export const patientApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPatients: builder.query<IPatient[], void>({
      // TODO statuses has to be removed
      query: () => "patients?statuses=EXPECTED",
    }),
    getPatientsById: builder.query<IPatient, number>({
      query: (id: number) => `patients/${id}`,
    }),
  }),
});

export const { useGetPatientsQuery, useGetPatientsByIdQuery } = patientApi;
