import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import DrawCard from "src/components/viewCard/ViewCard";
import CommentCard, { IComment } from "src/components/comment/CommentCards";
import {
  useAddWishesCommentsMutation,
  useGetWishesCommentsQuery,
  useLazyGetWishesByIdQuery,
} from "src/services/api/wishesApi";
import { UserName, PatientName } from "src/pages/wishes/WishesPage";

export interface IWishComment extends IComment {}

const ViewWishes = () => {
  const { id: wishId } = useParams();
  const [trigger, data] = useLazyGetWishesByIdQuery();
  const [addCommentTrigger] = useAddWishesCommentsMutation();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (wishId) {
      trigger(wishId);
    }
  }, []);

  // TODO change on model
  const addComment = () => {
    const comment = prompt("Коменть!");
    console.log(`${userInfo.id} AAAAAAAAAAAAAAAAAA`);
    if (comment && wishId) {
      addCommentTrigger({
        id: 0,
        objId: parseInt(wishId, 10),
        createDate: Date.now(),
        creatorId: userInfo.id,
        description: comment,
        creatorName: "",
      });
    }
  };

  return !data.data ? (
    <br />
  ) : (
    <DrawCard
      title="Заявки"
      viewCardTheme={{ key: "Тема", value: data.data.title }}
      obj={[
        {
          key: "Пациент",
          value: <PatientName id={data.data.patientId} />,
          style: "view_card__row two_columns",
        },
        {
          key: "Исполнитель",
          value: <UserName id={data.data.executorId} />,
          style: "view_card__row two_columns",
        },
        {
          key: "Плановая дата",
          value: format(data.data.planExecuteDate, "dd.MM.yyyy"),
          style: "view_card__row two_columns",
        },
        {
          key: "",
          value: data.data.status,
          style: "view_card__row just_center",
        },
        {
          key: "Описание",
          value: data.data.description,
          style: "view_card__description",
        },
        {
          key: "Автор",
          value: <UserName id={data.data.creatorId} />,
          style: "view_card__row two_columns",
        },
        {
          key: "Дата создания",
          value: format(data.data.createDate, "dd.MM.yyyy"),
          style: "view_card__row two_columns",
        },
      ]}
      comments={<WishComments wishId={wishId!} />}
      addComment={addComment}
    />
  );
};

const WishComments = ({ wishId }: { wishId: string }) => {
  const { data: comments } = useGetWishesCommentsQuery(wishId);

  return comments ? (
    <div>
      {comments?.map((comment: IWishComment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <h1>Nothing</h1>
  );
};

export default ViewWishes;
