import { IPatient, useGetPatientsQuery } from "src/services/api/patientApi";

export const useGetPatientByIdFromCache = (
  id: number
): IPatient | undefined => {
  const { patient } = useGetPatientsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      patient: data?.find((p) => p.id === id),
    }),
  });

  return patient;
};
