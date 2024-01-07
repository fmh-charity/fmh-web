import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { WishDto } from "../../../api/model";
import dayjs from "dayjs";
import { Icon } from "../../icon";
import { StatusWishes } from "../../table-section/elements/wishes/status";
import { ExecuteDate } from "../../table-section/elements/wishes/executeDate";
import { wishStatuses } from "../../../common/statuses";
import { joinNames } from "../../../common/utils";
import { PopupMenu } from "../../popup-menu/popup-menu";
import { useOpenModal } from "../../../hooks/useOpenModal";
import { CancelWish } from "../../../modals/cancel-wish/cancel-wish";

const columnHelper = createColumnHelper<WishDto>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "№",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor("title", {
    header: () => "Просьба",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor(
    (row) =>
      row.planExecuteDate
        ? dayjs.utc(row.planExecuteDate).format("DD.MM.YYYY")
        : "",
    {
      id: "planExecuteDate",
      header: () => "Выполнить до",
      cell: (props) => <ExecuteDate row={props.row} />,
    }
  ),
  columnHelper.accessor(
    ({ patient }) => {
      const { firstName, lastName, middleName } = patient || {};
      return joinNames(firstName, middleName, lastName) || "Хоспис";
    },
    {
      id: "patient",
      header: () => "Для кого",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) => {
      const status = wishStatuses[row.status as keyof WishDto["status"]];
      if (status) return status;
      else return "";
    },
    {
      id: "status",
      header: () => "Статус",
      cell: (props) => <StatusWishes row={props.row} />,
    }
  ),
  columnHelper.accessor(
    ({ executor }) => {
      const { firstName, lastName, middleName } = executor || {};
      return joinNames(firstName, middleName, lastName) || "Хоспис";
    },
    {
      id: "executor",
      header: () => "Испонитель",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor((row) => <Actions id={`${row.id}`} />, {
    id: "actions",
    header: () => "",
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    cell: (props) => props.renderValue(),
  }),
];

const Actions = ({ id }: { id: string }) => {
  const openModal = useOpenModal();
  const menuItems = [
    {
      label: <>
        <Icon.Change16 />
        <div>Отменить</div>
      </>,
      onClick: () => openModal(CancelWish, { id })
    }
  ];
  return (
    <PopupMenu items={menuItems} />
  );
};
