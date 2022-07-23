import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import DrawCard from "src/components/card/viewCard/ViewCard";
import CommentCard from "src/components/comment/CommentCards";
import {
  useAddWishesCommentsMutation,
  useGetWishesByIdQuery,
  useGetWishesCommentsQuery,
} from "src/services/api/wishesApi";
import { useGetUsersQuery } from "src/services/api/usersApi";
import { IComment } from "src/model/IComment";
import { PatientName, UserName } from "src/utils/GetNames";

export interface IWishComment extends IComment {}

const ViewWishes = ({ id }: { id: number }) => {
  const data = useGetWishesByIdQuery(id);
  const [addCommentTrigger] = useAddWishesCommentsMutation();
  const userInfo = useSelector(selectUserInfo);

  const addComment = async (description: string): Promise<boolean> => {
    try {
      await addCommentTrigger({
        id: 0,
        objId: id,
        createDate: Date.now(),
        creatorId: userInfo.id,
        description,
        creatorName: "",
      }).unwrap();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return !data.data ? (
    <br />
  ) : (
    <DrawCard
      title="Просьбы"
      viewCardTheme={{ key: "Тема", value: data.data.title }}
      obj={[
        {
          key: "Пациент",
          value: <PatientName id={data.data.patientId} />,
          style: "view_card__row two_columns",
        },
        {
          key: "Исполнитель",
          value: data.data.executorId && <UserName id={data.data.executorId} />,
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
      comments={<WishComments wishId={id} />}
      addComment={addComment}
      changeStatus={() => {}}
    />
  );
};

const WishComments = ({ wishId }: { wishId: number }) => {
  const { data: comments } = useGetWishesCommentsQuery(wishId);
  const { data: users } = useGetUsersQuery();

  const commentsWithCreatorNames = comments?.map((comment: IWishComment) => {
    const commentWithCreatorName = { ...comment };
    const user = users?.find((u) => u.id === commentWithCreatorName.creatorId);
    commentWithCreatorName.creatorName = `${user?.lastName} ${user?.firstName} ${user?.middleName}`;

    return commentWithCreatorName;
  });

  return comments ? (
    <div>
      {commentsWithCreatorNames?.map((comment: IWishComment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <h1>Nothing</h1>
  );
};

export default ViewWishes;
