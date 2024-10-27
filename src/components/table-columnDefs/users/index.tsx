import { createColumnHelper } from "@tanstack/react-table";
import type { UserInfoDto } from "../../../api/model";
import dayjs from "dayjs";
import { Icon } from "../../icon";
import { useNavigate } from "react-router-dom";
import { joinNames } from "../../../common/utils";
import { roleNames, RolesType } from "../../../common/roles";
import { useOpenModal } from "../../../hooks/useOpenModal";
import { PopupMenu } from "../../popup-menu/popup-menu";

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
    id: "Roles",
    header: () => 'Роль',
    cell: (props) => 
      props.getValue()?.map(r => roleNames.get(r as RolesType)).join(', ') || "Не установлена",
  }),

  columnHelper.accessor("email.name", {
    id: "E-mail",
    header: () => 'E-mail',
    cell: (props) => props.getValue(),
  }),
  // columnHelper.accessor("email.isConfirmed", {
  //   header: () => 'E-mail подтвержден',
  //   cell: (props) => props.getValue() ? 'Да' : 'Нет',
  // }),
  columnHelper.accessor("isConfirmed", {
    header: () => 'Пользователь подтвержден',
    cell: (props) => props.getValue() ? 'Подтвержден' : 'Не подтвержден',
  }),
  columnHelper.accessor("admin", {
    header: () => 'Права администратора',
    cell: (props) => props.getValue() ? 'Есть' : 'Нет',
  }),

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
  const navigate = useNavigate();

  const menuItems = [
    {
      label: <>
        <Icon.Change16 />
        <div>Редактировать</div>
      </>,
      onClick: () => navigate(`/users/update/${id}`)
    },
    // TODO: после создания методов для удаления пользователей
    // {
    //   label: <>
    //     <Icon.Trash16 />
    //     <div>Удалить</div>
    //   </>,
    //   onClick: () => openModal(DeleteUser, { id })
    // },
  ];

  return (
    <PopupMenu items={menuItems} />
  );
};

