import { Link, useLoaderData, useParams } from "react-router-dom";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import { WishesForm } from "../../components/wishes-form";

export const WishesId = () => {
  const { wish, patients, users } = useLoaderData() as {
    wish: { body: WishDto };
    patients: { body: PatientByStatusRs[] };
    users: { body: UserShortInfoDto[] };
  };
  const params = useParams();
  return (
    <div>
      <div>
        wish by id {params.id}
        <Link to="..">back</Link>
      </div>
      <WishesForm
        intent="EDIT"
        wish={wish.body}
        patients={patients.body}
        users={users.body}
      />
      <pre>{JSON.stringify(wish, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(patients, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};
