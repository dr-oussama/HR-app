import { useState } from "react";
import { Payroll } from "@/services/payroll-service";
import { updatePayroll } from "../hooks/usePayrolls";

interface UpdatePayrollFormProps {
  payroll: Payroll;
  user_id: number;
  onClose: () => void;
  onUpdatePayroll: (newPayroll: Payroll) => void;
}

const UpdatePayrollForm = ({
  payroll,
  user_id,
  onClose,
  onUpdatePayroll,
}: UpdatePayrollFormProps) => {
  const initialPayrollState = payroll;

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
      await updatePayroll(newPayroll);
      console.log(newPayroll);
      setNewPayroll(initialPayrollState);
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
              onClick={() => onUpdatePayroll(newPayroll)}
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

export default UpdatePayrollForm;
