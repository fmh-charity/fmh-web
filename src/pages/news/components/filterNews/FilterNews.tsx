import React from "react";
// import { useSelector } from "react-redux";
// import { useAddNewsMutation } from "src/services/api/newsApi";
// import { selectUserInfo } from "src/features/auth/authSlice";
// import FormNews from "src/pages/news/components/formNews/FormNews";
// import { INews } from "src/model/INews";
import { FormFilter } from "src/pages/news/components/formFilter/FormFilter";

export interface NewsPost {
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string | undefined;
  newsCategoryId: number;
  publishDate: number;
  publishEnabled: boolean | undefined;
  title: string | undefined;
}

const FilterNews = () => {
  const publishDate = Date.now();
  // const [addNews] = useAddNewsMutation();
  // const newsPost: INews = {
  //   createDate: Date.now(),
  //   description: "",
  //   newsCategoryId: 1,
  //   publishEnabled: false,
  //   title: "",
  //   creatorId: userInfo.id,
  //   creatorName: `${userInfo.firstName} ${userInfo.lastName} ${userInfo.middleName}`,
  //   publishDate: Date.now(),
  //   id: 0,
  // };

  return <FormFilter publishDate={publishDate} title="Фильтр новостей" />;
  // return <FormNews news={newsPost} title="Создать новость" submit={addNews} />;
};

export default FilterNews;
