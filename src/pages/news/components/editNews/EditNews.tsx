import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useEditNewsMutation,
  useLazyGetNewsByIdQuery,
} from "src/services/api/newsApi";
import FormNews from "src/pages/news/components/formNews/FormNews";

const EditNews = () => {
  const { id: newsId } = useParams();
  const [trigger, data] = useLazyGetNewsByIdQuery();
  const [edit] = useEditNewsMutation();

  useEffect(() => {
    if (newsId) {
      trigger(newsId);
    }
  }, []);

  return data.data ? (
    <FormNews news={data.data} title="Изменить новость" submit={edit} />
  ) : (
    <h1>Null</h1>
  );
};

export default EditNews;
