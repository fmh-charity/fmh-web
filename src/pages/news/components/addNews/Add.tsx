import React from "react";
import FormNews from "../formNews/FormNews";

export const Add = () => {
  const qwe = "qwe";
  return (
    <FormNews
      news={null}
      title="Создать новость"
      submit={() => console.log("This is work", qwe)}
    />
  );
};
