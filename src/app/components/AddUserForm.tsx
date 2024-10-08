import { useState } from "react";
import EditAvatar from "./EditAvatar";
import useDepartements from "../hooks/useDepartements";
import { User } from "@/services/user-service";
import { addUser } from "../hooks/useUsers";

interface AddUserFormProps {
  onClose: () => void;
  onAddUser: (newUser: User) => void;
}

const AddUserForm = ({ onClose, onAddUser }: AddUserFormProps) => {
  const { departements, isLoading, error } = useDepartements();

  const initialUserState: User = {
    user_id: 0,
    cin: "HH15485",
    first_name: "test",
    last_name: "test",
    email: "test@test",
    password: "test",
    phone_number: "test",
    hire_date: Date.now().toString(),
    job_title: "test",
    basic_salary: 15000,
    picture: "luffy5.jpg",
    department_id: 0,
    payroll: [],
  };

  const [newUser, setNewUser] = useState<User>(initialUserState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addUser(newUser);
      console.log(newUser);
      setNewUser(initialUserState);
    } catch (error) {
      console.error("Error adding user:");
    }
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex flex-col items-center mb-4">
          <EditAvatar url={newUser.picture} onAvatarChange={() => {}} />
          <h2 className="text-xl font-bold mt-2">Add New User</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cin">CIN:</label>
              <input
                type="text"
                id="cin"
                name="cin"
                value={newUser.cin}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={newUser.first_name}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={newUser.last_name}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={newUser.phone_number}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="hire_date">Hire Date:</label>
              <input
                type="date"
                id="hire_date"
                name="hire_date"
                value={newUser.hire_date}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="basic_salary">Basic Salary:</label>
              <input
                type="text"
                id="basic_salary"
                name="basic_salary"
                value={newUser.basic_salary}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="job_title">Job Title:</label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={newUser.job_title}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="departement">Department:</label>
              <select
                id="departement"
                name="departement_id"
                value={newUser.department_id}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              >
                <option value="">Select a department</option>
                {/* Render department options from the fetched data */}
                {isLoading ? (
                  <option>Loading departments...</option>
                ) : error ? (
                  <option>Error fetching departments</option>
                ) : (
                  departements.map((department) => (
                    <option
                      key={department.department_id}
                      value={department.department_id}
                    >
                      {department.department_name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onAddUser(newUser)}
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

export default AddUserForm;
