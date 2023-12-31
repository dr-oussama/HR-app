import { useState } from "react";
import { DocumentRequest } from "@/services/documentRequest-service";
import { addRequest } from "../hooks/useRequests";

interface AddRequestFormProps {
  onClose: () => void;
  onAddRequest: (newRequest: DocumentRequest) => void;
}

const AddRequestForm = ({ onClose, onAddRequest }: AddRequestFormProps) => {
    const currentDate = new Date();
  const initialRequestState: DocumentRequest = {
    request_id: 0,
    user_id: 0,
    request_date: currentDate.toISOString(),
    request_message: "",
    status: "PENDING",
    user: {
      user_id: 0,
      cin: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      hire_date: Date.now().toString(),
      job_title: "",
      basic_salary: 15000,
      picture: "",
      department_id: 0,
      payroll: [],
    },
  };

  const [newRequest, setNewRequest] =
    useState<DocumentRequest>(initialRequestState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewRequest((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addRequest(newRequest);
      console.log("DIAL DB",newRequest);
      setNewRequest(initialRequestState);
    } catch (error) {
      console.error("Error adding request:");
    }
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="request_message">Request message:</label>
              <input
                type="text"
                id="request_message"
                name="request_message"
                value={newRequest.request_message}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onAddRequest(newRequest)}
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

export default AddRequestForm;
