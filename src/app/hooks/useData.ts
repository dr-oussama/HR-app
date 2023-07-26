import { useEffect, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../../services/api-client";
import { User } from "./useUsers";

interface FetchResponse<T> {
  results: T[];
}

const useData = (
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClient
      .get<User[]>(endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
