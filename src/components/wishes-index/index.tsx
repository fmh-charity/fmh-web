import { Link, useLoaderData } from "react-router-dom";
import type { WishPaginationDto } from "../../api/model";

export const WishesIndex = () => {
  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  return (
    <div>
      wishes
      {wishes.body.elements?.map((e) => (
        <div key={e.id}>
          <Link to={`${e.id}`}>{e.title}</Link>
        </div>
      ))}
    </div>
  );
};
