import React, { ReactElement, ReactNode, useState } from "react";
import StatusIcon from "src/assets/icons/status_processing.svg";
import StaffIcon from "src/assets/icons/staff.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import AddIcon from "src/assets/icons/add.svg";
import ArrowLeftIcon from "src/assets/icons/arrow_left.svg";
import { Link } from "react-router-dom";
import "./ViewCard.less";
import AddComment from "src/components/comment/addComment/AddComment";

const DrawCard = ({
  title,
  viewCardTheme,
  obj,
  comments,
  addComment,
  changeStatus,
}: {
  title: string;
  viewCardTheme: { key: string; value: string };
  obj: { key: string; value: string | ReactNode; style: string }[];
  comments: ReactNode;
  addComment: (description: string) => Promise<boolean>;
  changeStatus: () => void;
}) => {
  return (
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
            {/* TODO Зона видимости в разработке на беке */}
            <ViewCardIconSelect
              icon={
                <StaffIcon
                  width={24}
                  height={24}
                  className="status_select_icon"
                />
              }
              btns={[
                {
                  value: "Зона видимости TODO",
                  func: () => console.log("Зона видимости TODO"),
                },
              ]}
            />
            <ViewCardIconSelect
              icon={<StatusIcon width={24} height={24} />}
              btns={[
                {
                  value: "Взять в работу",
                  func: changeStatus,
                },
                { value: "Отменить", func: changeStatus },
              ]}
            />
            <AddComment addComment={addComment}>
              {({ changeVisible }) => <AddIcon onClick={changeVisible} />}
            </AddComment>
            <EditIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IButton {
  value: string;
  func: () => void;
}

const ViewCardIconSelect = ({
  icon,
  btns,
}: {
  icon: ReactElement;
  btns: IButton[];
}) => (
  <div className="status_select">
    {icon}
    <ul className="status_select_visible">
      {btns.map((btn) => (
        <li key={btn.value}>
          <button type="button" onClick={btn.func}>
            {btn.value}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default DrawCard;
