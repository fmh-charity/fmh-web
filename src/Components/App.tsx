import { Link, Outlet } from "react-router-dom";
import { useAuthBroadcastRevalidator } from "../shared/hooks";

export const App = () => {

  useAuthBroadcastRevalidator();

  return (
    <div>
      <h1>main</h1>
      <div>
        <Link to="/">main</Link>
      </div>
      <div>
        <Link to="/news">news</Link>
      </div>
      <div>
        <Link to="/about">about</Link>
      </div>
      <Outlet />
    </div>
  );
};
