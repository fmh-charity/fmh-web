import React, { useState } from "react";
import FormWishes from "src/pages/wishes/components/formWishes/FormWishes";
import { IWishes } from "src/pages/wishes/WishesPage";
import { useAddWishesMutation } from "src/services/api/wishesApi";
import ModalComponent from "src/components/modalComponent/ModalComponent";

const AddWishes = () => {
  const [addClaim] = useAddWishesMutation();
  const newClaim: IWishes = {
    createDate: Date.now(),
    creatorId: 0,
    // TODO Fix
    patientId: 1,
    description: "",
    executorId: 0,
    executorName: "",
    factExecuteDate: null,
    id: 0,
    planExecuteDate: Date.now(),
    status: "",
    title: "",
  };
  const [visible, setVisible] = useState(true);

  const changeVisible = () => {
    setVisible(!visible);
  };

  return (
    <ModalComponent visible={visible} setVisible={changeVisible}>
      <FormWishes
        wishes={newClaim}
        titlePage="Создание заявки"
        submit={addClaim}
        cancelButton={changeVisible}
      />
    </ModalComponent>
  );
};

export default AddWishes;
