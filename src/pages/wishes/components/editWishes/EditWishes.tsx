import React from "react";
import FormWishes from "src/pages/wishes/components/formWishes/FormWishes";
import { IWish } from "src/model/IWish";
import { useUpdateWishesMutation } from "src/services/api/wishesApi";

const EditWishes = ({
  wish,
  changeVisible,
}: {
  wish: IWish | undefined;
  changeVisible: () => void;
}) => {
  const [updateWish] = useUpdateWishesMutation();

  return (
    <FormWishes
      propWish={wish}
      titlePage="Изменить просьбу"
      submit={updateWish}
      cancelButton={changeVisible}
    />
  );
};

export default EditWishes;
