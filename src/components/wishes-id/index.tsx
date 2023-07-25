import { Link, useFetcher, useLoaderData, useParams } from "react-router-dom";
import { Input } from "../input";
import { TextArea } from "../textarea";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import { statuses } from "../../common/statuses";

export const WishesId = () => {
  const { wish, patients, users } = useLoaderData() as {
    wish: { body: WishDto };
    patients: { body: PatientByStatusRs[] };
    users: { body: UserShortInfoDto[] };
  };
  const params = useParams();
  const fetcher = useFetcher();
  return (
    <div>
      <div>
        wish by id {params.id}
        <Link to="..">back</Link>
      </div>
      <fetcher.Form>
        <div>
          <Input
            name="title"
            type="text"
            label="Название"
            defaultValue=""
            placeholder="Введите название..."
            error=""
          />

          <TextArea
            name="description"
            label="Описание"
            defaultValue=""
            placeholder="Введите описание..."
            error=""
          />

          <Input
            name="planExecuteDate"
            type="date"
            label="Плановая дата завершение"
            defaultValue=""
            error=""
          />

          <div>
            <div>Для кого</div>
            <select>
              <option value="" defaultChecked>
                Для хосписа
              </option>
              <option disabled>---------</option>
              {patients.body.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {[patient.firstName, patient.middleName, patient.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div>Приоритет</div>
            <input
              type="radio"
              id="priority1"
              name="wishPriority"
              value="RED"
            />
            <label htmlFor="priority1">RED</label>
            <input
              type="radio"
              id="priority2"
              name="wishPriority"
              value="YELLOW"
            />
            <label htmlFor="priority2">YELLOW</label>
            <input
              type="radio"
              id="priority3"
              name="wishPriority"
              value="GREEN"
            />
            <label htmlFor="priority3">GREEN</label>
          </div>
        </div>
        <div>
          <div>Исполнители</div>
          <select multiple style={{ height: "300px" }}>
            {users.body.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {[user.firstName, user.middleName, user.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div>Статус</div>
          <select>
            {Object.keys(statuses).map((k) => (
              <option key={k}>{statuses[k as keyof WishDto["status"]]}</option>
            ))}
          </select>
        </div>
      </fetcher.Form>
      <pre>{JSON.stringify(wish, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(patients, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};
