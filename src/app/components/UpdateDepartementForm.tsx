import { useState } from "react";
import { Department } from "@/services/departement-service";
import { updateDepartement } from "../hooks/useDepartements";

interface UpdateDeptFormProps {
  department: Department;
  onClose: () => void;
  onUpdateDept: (newDept: Department) => void;
}

const UpdateDepartementForm = ({
  department,
  onClose,
  onUpdateDept: onUpdatePayroll,
}: UpdateDeptFormProps) => {
  const initialPayrollState = department;

  const [newDepartement, setNewDepartement] =
    useState<Department>(initialPayrollState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDepartement((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateDepartement(newDepartement);
      console.log(newDepartement);
      setNewDepartement(initialPayrollState);
    } catch (error) {
      console.error("Error updating payroll:");
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
              <label htmlFor="department_name">Departement name:</label>
              <input
                type="text"
                id="department_name"
                name="department_name"
                value={newDepartement.department_name}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onUpdatePayroll(newDepartement)}
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

export default UpdateDepartementForm;
