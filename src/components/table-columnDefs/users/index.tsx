import { createColumnHelper } from "@tanstack/react-table";
import type { PatientByStatusRs, UserInfoDto } from "../../../api/model";
import dayjs from "dayjs";
import { Icon } from "../../icon";
import { Link } from "react-router-dom";
import { joinNames } from "../../../common/utils";
import { roleNames } from "../../../common/roles";

const columnHelper = createColumnHelper<UserInfoDto>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "№",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor(
    (row) => {
      const { firstName, lastName, middleName } = row || {};
      return joinNames(firstName, middleName, lastName) || "";
    },
    {
      id: "fullName",
      header: () => "ФИО пользователя",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor("roles", {
    header: () => 'Роли',
    cell: (props) => 
      props.getValue()?.map(r => roleNames.get(r)).join(', ') || "Не установлена",
  }),

  columnHelper.accessor("email.name", {
    header: () => 'E-mail',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor("email.isConfirmed", {
    header: () => 'E-mail подтвержден',
    cell: (props) => props.getValue() ? 'yes' : 'no',
  }),
  // columnHelper.accessor("isConfirmed", {
  //   header: () => 'Пользователь подтвержден',
  //   cell: (props) => props.getValue() ? 'Подтвержден' : 'Не подтвержден',
  // }),
  columnHelper.accessor("admin", {
    header: () => 'Права администратора',
    cell: (props) => props.getValue() ? 'Есть' : 'Нет',
  }),
  // columnHelper.accessor(
  //   (row) => {
  //     return row.room?.name;
  //   },
  //   {
  //     id: "room",
  //     header: () => "Палата",
  //     cell: (props) => props.getValue(),
  //   }
  // ),
  // columnHelper.accessor(
  //   (row) => {
  //     const dateIn = dayjs.utc(row.dateIn).format("YYYY-MM-DD");
  //     return dateIn;
  //   },
  //   {
  //     id: "dateIn",
  //     header: "Дата поступления",
  //     cell: (props) => props.getValue(),
  //   }
  // ),
  // columnHelper.accessor(
  //   (row) => {
  //     const dateIn = dayjs.utc(row.dateOut).format("YYYY-MM-DD");
  //     return dateIn;
  //   },
  //   {
  //     id: "dateOut",
  //     header: "Дата выписки",
  //     cell: (props) => props.getValue(),
  //   }
  // ),
  // columnHelper.accessor(
  //   (row) => {
  //     const status =
  //       patientStatuses[row.status as keyof PatientByStatusRs["status"]];
  //     if (status) return status;
  //     else return "";
  //   },
  //   {
  //     id: "status",
  //     header: () => "Статус",
  //     cell: (props) => <StatusPatients row={props.row} />,
  //   }
  // ),
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
  return (
    <Link to={id}>
      <Icon.ActionDefault24 />
    </Link>
  );
};
