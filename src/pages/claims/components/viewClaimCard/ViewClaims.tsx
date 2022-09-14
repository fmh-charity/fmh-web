import React, { useContext } from "react";
import {
  useAddClaimCommentsMutation,
  useGetClaimByIdQuery,
  useGetClaimCommentsQuery,
} from "src/services/api/claimsApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import DrawCard from "src/components/card/viewCard/ViewCard";
import CommentCard from "src/components/comment/CommentCards";
import { IComment } from "src/model/IComment";
import EditClaims from "src/pages/claims/components/editClaims/EditClaims";
import { ModalContext } from "src/components/modal/Modal";
import { IClaim } from "src/model/IClaim";

export interface IClaimComment extends IComment {}

const EditClaimsComp = ({ data }: { data: IClaim }) => {
  const changeVisible = useContext(ModalContext);
  return <EditClaims claim={data} changeVisible={() => changeVisible?.()} />;
};

const ViewClaims = ({ id }: { id: number }) => {
  const data = useGetClaimByIdQuery(id);
  const [addCommentTrigger] = useAddClaimCommentsMutation();
  const userInfo = useSelector(selectUserInfo);

  const changeStatus = () => {
    console.log("changeStatus");
  };

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
      title="Заявка"
      viewCardTheme={{ key: "Тема", value: data.data.title }}
      obj={[
        {
          key: "Исполнитель",
          value: data.data.executorName || "Не назначен",
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
          value: data.data.creatorName,
          style: "view_card__row two_columns",
        },
        {
          key: "Дата создания",
          value: format(data.data.createDate, "dd.MM.yyyy"),
          style: "view_card__row two_columns",
        },
      ]}
      comments={<ClaimComments claimId={id} />}
      addComment={addComment}
      changeStatus={changeStatus}
      editObj={<EditClaimsComp data={data.data} />}
    />
  );
};

const ClaimComments = ({ claimId }: { claimId: number }) => {
  const { data: comments } = useGetClaimCommentsQuery(claimId);

  return comments ? (
    <div>
      {comments?.map((comment: IClaimComment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <h1>Nothing</h1>
  );
};

export default ViewClaims;
