import React, { useEffect } from "react";
import StatusIcon from "src/assets/icons/status_processing.svg";
import StaffIcon from "src/assets/icons/staff.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import AddIcon from "src/assets/icons/add.svg";
import ArrowLeftIcon from "src/assets/icons/arrow_left.svg";
import { Link, useParams } from "react-router-dom";
import {
  useAddClaimCommentsMutation,
  useLazyGetClaimByIdQuery,
} from "src/services/api/claimsApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import styles from "./ViewClaims.module.less";
import { IClaims } from "../../ClaimsPage";
import ClaimComments from "../claimComments/ClaimComments";

const ViewClaims = () => {
  const { id: claimId } = useParams();
  const [trigger, data] = useLazyGetClaimByIdQuery();
  const [addCommentTrigger] = useAddClaimCommentsMutation();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (claimId) {
      trigger(claimId);
    }
  }, []);

  // TODO change on model
  const addComment = () => {
    const comment = prompt("Коменть!");
    if (comment && claimId) {
      addCommentTrigger({
        id: 0,
        claimId: parseInt(claimId, 10),
        createDate: Date.now(),
        creatorId: userInfo.id,
        description: comment,
        creatorName: "",
      });
    }
  };

  return !data.data ? (
    <h1>Null</h1>
  ) : (
    <ViewClaimCard claim={data.data} addComment={addComment} />
  );
};

const ViewClaimCard = ({
  claim,
  addComment,
}: {
  claim: IClaims;
  addComment: () => void;
}) => (
  <div className={styles.edit_claims__container}>
    <header className={styles.edit_claims__page_header}>
      <div className={styles.edit_claims__header_title}>Заявки</div>
    </header>
    <div className={styles.edit_claims__wrapper}>
      <div className={styles.edit_claims__header}>
        <span>Тема</span>
        <span>{claim.title}</span>
      </div>
      <div className={styles.edit_claims__wrapper_content}>
        <div className={`${styles.edit_claims__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Исполнитель</span>
          <span>{claim.executorName}</span>
        </div>
        <div className={`${styles.edit_claims__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Плановая дата</span>
          <span>{format(claim.planExecuteDate, "dd.MM.yyyy")}</span>
        </div>
        <div className={`${styles.edit_claims__row} ${styles.just_center}`}>
          {claim.status}
        </div>
        <div className={`${styles.edit_claims__description}`}>
          {claim.description}
        </div>
        <div className={`${styles.edit_claims__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Aвтор</span>
          <span>{claim.creatorName}</span>
        </div>
        <div className={`${styles.edit_claims__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Создана</span>
          <span>{format(claim.createDate, "dd.MM.yyyy")}</span>
        </div>
        <div className={styles.edit_claims__comments}>
          <ClaimComments claimId={claim.id} />
        </div>
      </div>
      <div className={styles.edit_claims__icons}>
        <Link to="/claims">
          <ArrowLeftIcon />
        </Link>
        <StaffIcon />
        <StatusIcon />
        <AddIcon onClick={addComment} />
        <EditIcon />
      </div>
    </div>
  </div>
);

export default ViewClaims;
