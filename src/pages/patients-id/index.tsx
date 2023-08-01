import { Link, useLoaderData, useParams } from "react-router-dom";

export const PatientsId = () => {
  const data = useLoaderData() as {
    patient: { body: any };
  };
  const params = useParams();
  return (
    <div>
      <div>
        patient by id {params.id}
        <Link to="..">back</Link>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
