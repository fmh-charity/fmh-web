import { createColumnHelper } from "@tanstack/react-table";
import type { PatientByStatusRs, PatientDto } from "../../../api/model";
import dayjs from "dayjs";
import { Icon } from "../../icon";
import { Link, useNavigate } from "react-router-dom";
import { patientStatuses } from "../../../common/statuses";
import { joinNames } from "../../../common/utils";
import { StatusPatients } from "../../table-section/elements/patients/status";
import { useOpenModal } from "../../../hooks/useOpenModal";
import { DeletePatient } from "../../../modals/delete-patient/delete-patient";
import { PopupMenu } from "../../popup-menu/popup-menu";

const columnHelper = createColumnHelper<PatientDto>();

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
      header: () => "ФИО пациента",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) => {
      return row.room?.name;
    },
    {
      id: "room",
      header: () => "Палата",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) => {
      const dateIn = dayjs.utc(row.dateIn).format("YYYY-MM-DD");
      return dateIn;
    },
    {
      id: "dateIn",
      header: "Дата поступления",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) => {
      const dateIn = dayjs.utc(row.dateOut).format("YYYY-MM-DD");
      return dateIn;
    },
    {
      id: "dateOut",
      header: "Дата выписки",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) => {
      const status =
        patientStatuses[row.status as keyof PatientByStatusRs["status"]];
      if (status) return status;
      else return "";
    },
    {
      id: "status",
      header: () => "Статус",
      cell: (props) => <StatusPatients row={props.row} />,
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
  const navigate = useNavigate();

  const menuItems = [
    {
      label: <>
        <Icon.Change16 />
        <div>Редактировать</div>
      </>,
      onClick: () => navigate(`/patients/update/${id}`)
    },
    {
      label: <>
        <Icon.Trash16 />
        <div>Удалить</div>
      </>,
      onClick: () => openModal(DeletePatient, { id })
    },
  ];

  return (
    <PopupMenu items={menuItems} />
  );
};
