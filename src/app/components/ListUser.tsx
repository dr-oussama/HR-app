import { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import useUsers, { addUser } from "../hooks/useUsers";
import AddUserForm from "./AddUserForm";

const ListUser = () => {
  const { users, isLoading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleRowClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  const filteredUsers = users?.filter((user) =>
    user.cin.toLowerCase().includes(searchQuery.toLowerCase())
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
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone number</th>
              <th className="py-2 px-4 text-left">Hire date</th>
              <th className="py-2 px-4 text-left">Job title</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.user_id} className="border-b border-gray-300">
                <td className="py-2 px-4">{user.cin.toLocaleUpperCase()}</td>
                <td className="py-2 px-4">{user.last_name}</td>
                <td className="py-2 px-4">{user.first_name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone_number}</td>
                <td className="py-2 px-4">{user.hire_date.toString().split("T")[0]}</td>
                <td className="py-2 px-4">{user.job_title}</td>
                <td className="py-2 px-4">
                  <Link href={`user/${user.user_id}`} passHref>
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

      {showAddUserForm && (
        <AddUserForm
          onClose={() => setShowAddUserForm(false)}
          onAddUser={(user) => {
            users.push(user);
          }}
        />
      )}
    </div>
  );
};

export default ListUser;
