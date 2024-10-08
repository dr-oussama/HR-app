import { useEffect, useState } from "react";
import { AiOutlineUpload, AiOutlineCloseCircle } from "react-icons/ai";
import useRequests, { updateRequest } from "../hooks/useRequests";
import { DocumentRequest } from "@/services/documentRequest-service";
import UploadFileForm from "./UploadFileForm";

const RequestList = () => {
  const { requests, isLoading, error } = useRequests();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDocForm, setShowDocUserForm] = useState(false);
  const [requestsData, setRequestsData] = useState<DocumentRequest[]>();
  const currentDate = new Date();
  const [request, setRequest] = useState<DocumentRequest>({
    user_id: 0,
    request_id: 0,
    request_date: currentDate.toISOString(),
    request_message: "",
    status: "some_status",
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
  });

  useEffect(() => {
    // console.log("requests: "+requests);
    // console.log("requestsData: "+requestsData);
    setRequestsData(requests);
  }, [requests]);

  const updateStatus = async (
    requestDoc: DocumentRequest,
    newStatus: string
  ) => {
    const updatedRequestsData = requestsData?.map((request) => {
      if (request.request_id === requestDoc.request_id) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    await updateRequest({ ...requestDoc, status: newStatus });
    setRequestsData(updatedRequestsData);
  };

  const filteredUsers = requestsData?.filter((user) =>
    user.user.cin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "APPROVED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      case "CANCELED":
        return "bg-gray-500";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Requests List</h2>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by cin..."
          className="w-35percent flex-1 px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">CIN</th>
              <th className="py-2 px-4 text-left">Last name</th>
              <th className="py-2 px-4 text-left">First name</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Message</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((requestDoc) => (
              <tr
                key={requestDoc.request_id}
                className="border-b border-gray-300"
              >
                <td className="py-2 px-4">
                  {requestDoc.user.cin.toLocaleUpperCase()}
                </td>
                <td className="py-2 px-4">{requestDoc.user.last_name}</td>
                <td className="py-2 px-4">{requestDoc.user.first_name}</td>
                <td className="py-2 px-4">
                  {requestDoc.request_date.toString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{requestDoc.request_message}</td>
                <td>
                  <div
                    className={`py-2 px-4 ${getStatusColor(
                      requestDoc.status
                    )} m-2 w-24 text-white p-2 rounded-lg text-center`}
                  >
                    {requestDoc.status.toLocaleLowerCase()}
                  </div>
                </td>
                {requestDoc.status === "PENDING" && (
                  <td className="py-2 px-2">
                    <button
                      onClick={() => {
                        setRequest(requestDoc);
                        setShowDocUserForm(true);
                      }}
                      className="py-1 px-1 m-2"
                    >
                      <AiOutlineUpload className="text-blue-500 cursor-pointer text-xl" />
                    </button>

                    <button
                      onClick={() => {
                        //console.log(requestDoc);
                        updateStatus(requestDoc, "REJECTED");
                      }}
                      className="py-1 px-1 m-2"
                    >
                      <AiOutlineCloseCircle className="text-blue-500 cursor-pointer text-xl" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddDocForm && (
        <UploadFileForm
          user_id={request.user_id}
          onAddDoc={() => {
            updateStatus(request, "APPROVED");
          }}
          onClose={() => {
            setShowDocUserForm(false);
          }}
        />
      )}
    </div>
  );
};

export default RequestList;
