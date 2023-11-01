import { CanceledError } from "@/services/api-client";
import userService, { Document } from "@/services/document-service";
import { useState, useEffect } from "react";

const useDocument = () => {
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<Document>();
    request
      .then((res) => {
        setDocuments(res.data);
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
    documents,
    error,
    isLoading,
    setDocuments,
    setError,
  };
};

export const addDocument = async (document: Document) => {
  try {
    const response = await userService.create<Document>(document);
    return response.data;
  } catch (error) {
    throw new Error("Error adding document");
  }
};

export const updateDepartement = async (document: Document) => {
  try {
    console.log(document);
    const response = await userService.update<Document>(
      document,
      document.document_id
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating document");
  }
};

export default useDocument;
