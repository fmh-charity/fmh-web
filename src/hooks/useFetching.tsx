import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AP from "src/config/ApplicationProperties";

interface Authorization {
  accessToken: string;
  refreshToken: string;
}

function useFetching<T>(
  useQueryName: string,
  url: string
): {
  isLoading: boolean;
  error: unknown;
  items: T[];
} {
  const navigate = useNavigate();
  const response: string | null = localStorage.getItem("authorization");
  const auth: Authorization = response !== null ? JSON.parse(response) : "";
  const [items, setItems] = useState<T[]>([]);
  const { isLoading, error, refetch } = useQuery(
    useQueryName,
    () =>
      fetch(`${AP.HOST}${url}`, {
        headers: { authorization: auth.accessToken },
      }).then(async (res) => {
        if (res.status === 401) {
          navigate("/login");
        } else if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        setItems(await res.json());
      }),
    { enabled: false }
  );

  useEffect(() => {
    refetch();
  }, []);

  return { isLoading, error, items };
}

export default useFetching;
