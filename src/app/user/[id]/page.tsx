"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOne, updateUser } from "../../hooks/useUsers";
import Avatar from "../../components/Avatar";
import { User } from "@/services/user-service";
import useDepartements from "@/app/hooks/useDepartements";
import { Payroll } from "@/services/payroll-service";
import { AiFillEdit } from "react-icons/ai";
import AddPayrollForm from "@/app/components/AddPayrollForm";

interface UpdateUserFormProps {
  onClose: () => void;
  onUpdateUser: (newUser: User) => void;
}

const UserProfilePage = ({ onClose, onUpdateUser }: UpdateUserFormProps) => {
  const { data, error } = useDepartements();
  const router = useParams();
  if (!router) return null;
  const id = router["id"];
  const [showAddPayrollForm, setShowAddPayrollForm] = useState(false);
  const { users, isLoading } = getOne(Number(id));
  const [payrolls, setPayrolls] = useState<Payroll[] | null>();
  const [newUser, setNewUser] = useState<User>({
    user_id: 0,
    cin: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    hire_date: "",
    job_title: "",
    basic_salary: 0,
    picture: "",
    department_id: 0,
    payroll: [],
  });

  useEffect(() => {
    if (users) {
      setNewUser(users);
      console.log(users.payroll);
      setPayrolls(users.payroll);
    } else {
      console.error("Failed to fetch user data");
    }
  }, [users]);

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
      await updateUser(newUser);
      console.log(newUser);
      setNewUser(newUser);
    } catch (error) {
      console.error("Error updating user:");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-500 p-4">
        <div className="flex flex-col items-center mt-8">
          <Avatar size="large" url={newUser.picture} />
          <h2 className="text-3xl font-bold mt-4 text-white">{`${newUser.first_name} ${newUser.last_name}`}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            User Information
          </h3>
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
                  value={newUser.hire_date.toString()}
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
                  <option value={newUser.department_id}>
                    {
                      data.find(
                        (dept) => dept.department_id == newUser.department_id
                      )?.department_name
                    }
                  </option>
                  {/* Render department options from the fetched data */}
                  {isLoading ? (
                    <option>Loading departments...</option>
                  ) : error ? (
                    <option>Error fetching departments</option>
                  ) : (
                    data.map((department) => (
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
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Payrolls</h3>
          <button
            onClick={() => setShowAddPayrollForm(true)}
            className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
          >
            Add Payroll
          </button>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Period start</th>
                <th className="py-2 px-4 text-left">Period end</th>
                <th className="py-2 px-4 text-left">Bonuses</th>
                <th className="py-2 px-4 text-left">Deductions</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {payrolls?.map((payroll) => (
                <tr
                  key={payroll.payroll_id}
                  className="border-b border-gray-300"
                >
                  <td className="py-2 px-4">
                    {payroll.pay_period_start.toString().split("T")[0]}
                  </td>
                  <td className="py-2 px-4">
                    {payroll.pay_period_end.toString().split("T")[0]}
                  </td>
                  <td className="py-2 px-4">{payroll.bonuses}</td>
                  <td className="py-2 px-4">{payroll.deductions}</td>
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
        </div>
        {showAddPayrollForm && (
        <AddPayrollForm
        user_id={Number(id)}
          onClose={() => setShowAddPayrollForm(false)}
          onAddPayroll={(payroll) => {
            payrolls?.push(payroll);
          }}
        />
      )}
      </div>
    </>
  );
};

export default UserProfilePage;
