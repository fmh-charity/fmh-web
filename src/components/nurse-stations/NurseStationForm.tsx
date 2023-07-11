import { Link, useFetcher } from "react-router-dom";
import type { NurseStationDto } from "../../api/model";

export const NurseStationsForm = ({
  intent,
  title,
  buttonText,
  data,
}: {
  intent: "CREATE" | "EDIT";
  title: string;
  buttonText: string;
  data: NurseStationDto;
}) => {
  const fetcher = useFetcher();
  return (
    <div>
      <h1>{title}</h1>
      <h4>
        <Link to="/nursestations">back</Link>
      </h4>
      <fetcher.Form method="POST">
        <div>
          <div>
            <input type="text" name="name" defaultValue={data.name} />
          </div>
          <div>name</div>
        </div>
        <div>
          <div>
            <textarea name="comment" defaultValue={data.comment}></textarea>
          </div>
          <div>comment</div>
        </div>
        <div>
          <button type="submit" disabled={fetcher.state === "submitting"}>
            {buttonText}
          </button>
          <input type="hidden" name="id" defaultValue={data.id} />
          <input type="hidden" name="intent" defaultValue={intent} />
        </div>
      </fetcher.Form>
    </div>
  );
};
