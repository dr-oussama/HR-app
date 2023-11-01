import { CanceledError } from "@/services/api-client";
import userService, {
  DocumentRequest,
} from "@/services/documentRequest-service";
import { useState, useEffect } from "react";

const useRequests = () => {
  const [error, setError] = useState("");
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<DocumentRequest>();
    request
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return {
    requests,
    error,
    isLoading,
    setRequests,
    setError,
  };
};

export const addRequest = async (request: DocumentRequest) => {
  try {
    const response = await userService.create<DocumentRequest>(request);
    return response.data;
  } catch (error) {
    throw new Error("Error adding request");
  }
};

export const updateRequest = async (request: DocumentRequest) => {
  try {
    console.log(request);
    const response = await userService.update<DocumentRequest>(
      request,
      request.request_id
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating request");
  }
};

export default useRequests;
