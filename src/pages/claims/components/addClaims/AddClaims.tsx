import React from "react";
import FormClaims from "src/pages/claims/components/formClaims/FormClaims";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { useAddClaimsMutation } from "src/services/api/claimsApi";

const AddClaims = () => {
  const [addClaim] = useAddClaimsMutation();
  const newClaim: IClaims = {
    createDate: Date.now(),
    creatorId: 0,
    creatorName: "",
    description: "",
    executorId: 0,
    executorName: "",
    factExecuteDate: null,
    id: 0,
    planExecuteDate: Date.now(),
    status: "",
    title: "",
  };

  return (
    <FormClaims
      claims={newClaim}
      titlePage="Создание заявки"
      submit={addClaim}
    />
  );
};

export default AddClaims;
