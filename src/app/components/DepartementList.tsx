import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import AddUserForm from "./AddUserForm";
import useDepartements from "../hooks/useDepartements";
import AddDepartementForm from "./AddDepartementForm";

const ListUser = () => {
  const { departements, isLoading, error } = useDepartements();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDeptForm, setShowAddDeptForm] = useState(false);

  const filteredUsers = departements?.filter((departement) =>
    departement.department_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Departements List</h2>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search departements..."
          className="w-35percent flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setShowAddDeptForm(true)}
          className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
        >
          Add Departement
        </button>
      </div>
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Departement id</th>
            <th className="py-2 px-4 text-left">Departement name</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((departement) => (
            <tr key={departement.department_id} className="border-b border-gray-300">
              <td className="py-2 px-4">{departement.department_id}</td>
              <td className="py-2 px-4">{departement.department_name}</td>
              <td className="py-2 px-4">
                <AiFillEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {showAddDeptForm && (
        <AddDepartementForm
          onClose={() => setShowAddDeptForm(false)}
          onAddDept={(dept) => {
            departements.push(dept);
          }}
        />
      )}
    </div>
  );
};

export default ListUser;
