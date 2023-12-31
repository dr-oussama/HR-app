import { useEffect, useRef, useState } from "react";
import { Document } from "../../services/document-service";
import { addDocument } from "../hooks/useDocument";

interface UploadFileFormProps {
  user_id: number;
  onClose: () => void;
  onAddDoc: (newDoc: Document) => void;
}

const UploadFileForm = ({
  user_id,
  onClose,
  onAddDoc,
}: UploadFileFormProps) => {
  const initialDocumentState: Document = {
    user_id: user_id,
    document_id: 0,
    document_name: "",
    document_file: "",
  };

  const [newDoc, setNewDoc] = useState<Document>(initialDocumentState);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    if(initialRender) {
      setInitialRender(false)
    }
    else {
      console.log("useEffect: " + newDoc.document_file);
      addDocument(newDoc);
    }
  }, [newDoc.document_file]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDoc((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files?.length) {
      alert("Please, select a file to upload");
      return;
    }

    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const body = await response.json();

        // Update newDoc with the new document file

        // Call addDocument with the updated newDoc
        await setNewDoc({ ...newDoc, document_file: body.file_path });
      } else {
        console.error("Failed to upload the document.");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
    // Reset the form
    //setNewDoc(initialDocumentState);
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label htmlFor="document_name">Document name:</label>
              <input
                type="text"
                id="document_name"
                name="document_name"
                value={newDoc.document_name}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="document_file">Document file:</label>
              <input
                type="file"
                id="document_file"
                name="document_file"
                ref={inputFileRef}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                onAddDoc(newDoc);
              }}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
              onClick={handleClear}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFileForm;
