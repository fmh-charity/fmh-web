import React, { ReactNode } from "react";
import StatusIcon from "src/assets/icons/status_processing.svg";
import StaffIcon from "src/assets/icons/staff.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import AddIcon from "src/assets/icons/add.svg";
import ArrowLeftIcon from "src/assets/icons/arrow_left.svg";
import { Link } from "react-router-dom";
import "./ViewCard.less";

const DrawCard = ({
  title,
  viewCardTheme,
  obj,
  comments,
  addComment,
}: {
  title: string;
  viewCardTheme: { key: string; value: string };
  obj: { key: string; value: string | ReactNode; style: string }[];
  comments: ReactNode;
  addComment: () => void;
}) => (
  <div className="view_card__container">
    <header className="view_card__page_header">
      <div className="view_card__header_title">{title}</div>
    </header>
    <div className="view_card__wrapper">
      <div className="view_card__header">
        <span>{viewCardTheme.key}</span>
        <span>{viewCardTheme.value}</span>
      </div>
      <div>
        {obj.map((ob) => (
          <div key={ob.key} className={ob.style}>
            <span>{ob.key}</span>
            <span>{ob.value}</span>
          </div>
        ))}
        <div className="view_card__comments">{comments}</div>
        <div className="view_card__icons">
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
  </div>
);

export default DrawCard;
