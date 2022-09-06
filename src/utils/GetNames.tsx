import { useGetUserByIdFromCache } from "src/hooks/useGetUserByIdFromCache";
import { useGetPatientByIdFromCache } from "src/hooks/useGetPatientByIdFromCache";
import React from "react";

export const UserName = ({ id }: { id: number }) => {
  const executor = useGetUserByIdFromCache(id);
  return (
    <span>
      {`${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`}
    </span>
  );
};

export const PatientName = ({ id }: { id: number }) => {
  const patient = useGetPatientByIdFromCache(id);
  return (
    <span>
      {`${patient?.lastName} ${patient?.firstName} ${patient?.middleName}`}
    </span>
  );
};
