import { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import AddUserForm from "./AddUserForm";
import useRequests from "../hooks/useRequests";

const RequestList = () => {
  const { requests, isLoading, error } = useRequests();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleRowClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  const filteredUsers = requests?.filter((user) =>
    user.user.cin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">User List</h2>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by cin..."
          className="w-35percent flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setShowAddUserForm(true)}
          className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
        >
          Add User
        </button>
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
            {filteredUsers?.map((request) => (
              <tr key={request.request_id} className="border-b border-gray-300">
                <td className="py-2 px-4">
                  {request.user.cin.toLocaleUpperCase()}
                </td>
                <td className="py-2 px-4">{request.user.last_name}</td>
                <td className="py-2 px-4">{request.user.first_name}</td>
                <td className="py-2 px-4">
                  {request.request_date.toString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{request.request_message}</td>
                <td className="py-2 px-4">{request.status}</td>
                <td className="py-2 px-4">
                  <Link href={`user/${request.user_id}`} passHref>
                    <AiFillEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {}}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddUserForm}
    </div>
  );
};

export default RequestList;
