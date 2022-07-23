import React from "react";
import FormClaims from "src/pages/claims/components/formClaims/FormClaims";
import { IClaim } from "src/model/IClaim";
import { useUpdateClaimsMutation } from "src/services/api/claimsApi";

const EditClaims = ({
  claim,
  changeVisible,
}: {
  claim: IClaim | undefined;
  changeVisible: () => void;
}) => {
  const [updateclaim] = useUpdateClaimsMutation();

  return (
    <FormClaims
      claims={claim}
      titlePage="Изменить просьбу"
      submit={updateclaim}
      cancelButton={changeVisible}
    />
  );
};

export default EditClaims;
