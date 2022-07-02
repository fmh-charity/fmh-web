import React from "react";
import FormClaims from "src/pages/claims/components/formClaims/FormClaims";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { useGetUsersQuery, usersApi } from "src/services/api/usersApi";

const AddClaims = () => {
  const newClaim: IClaims = {
    createDate: Date.now(),
    creatorId: 0,
    creatorName: "",
    description: "",
    executorId: 0,
    executorName: "",
    factExecuteDate: "",
    id: 0,
    planExecuteDate: Date.now(),
    status: "",
    title: "",
  };

  return (
    <FormClaims
      claims={newClaim}
      title="ExampleTitle"
      submit={() => console.log("data")}
    />
  );
};

export default AddClaims;
