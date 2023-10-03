import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import Avatar from "./Avatar";
import EditAvatar from "./EditAvatar";
import useDepartements from "../hooks/useDepartements";
import { User } from "@/services/user-service";
import { addUser } from "../hooks/useUsers";
import { Payroll } from "@/services/payroll-service";
import { addPayroll } from "../hooks/usePayrolls";

interface AddPayrollFormProps {
  user_id: number;
  onClose: () => void;
  onAddPayroll: (newPayroll: Payroll) => void;
}

const AddUserForm = ({
  user_id,
  onClose,
  onAddPayroll,
}: AddPayrollFormProps) => {
  const initialPayrollState: Payroll = {
    payroll_id: 0,
    user_id: user_id,
    pay_period_start: "",
    pay_period_end: "",
    bonuses: 0,
    deductions: 0,
  };

  const [newPayroll, setNewPayroll] = useState<Payroll>(initialPayrollState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPayroll((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addPayroll(newPayroll);
      console.log(newPayroll);
      setNewPayroll(initialPayrollState);
    } catch (error) {
      console.error("Error adding payroll:");
    }
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="pay_period_start">Pay period start:</label>
              <input
                type="date"
                id="pay_period_start"
                name="pay_period_start"
                value={newPayroll.pay_period_start}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="pay_period_end">Pay period end:</label>
              <input
                type="date"
                id="pay_period_end"
                name="pay_period_end"
                value={newPayroll.pay_period_end}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="bonuses">Bonuses:</label>
              <input
                type="number"
                id="bonuses"
                name="bonuses"
                value={newPayroll.bonuses}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="deductions">Deductions:</label>
              <input
                type="number"
                id="deductions"
                name="deductions"
                value={newPayroll.deductions}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onAddPayroll(newPayroll)}
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
