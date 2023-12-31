import { useEffect, useState } from "react";
import usePayrolls, { getOne } from "../hooks/usePayrolls";

const PayrollsList = () => {
  const { payrolls, isLoading, error } = usePayrolls();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Payrolls List</h2>
      </div>
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Period start</th>
              <th className="py-2 px-4 text-left">Period end</th>
              <th className="py-2 px-4 text-left">Bonuses</th>
              <th className="py-2 px-4 text-left">Deductions</th>
            </tr>
          </thead>
          <tbody>
            {payrolls?.map((payroll) => (
              <tr key={payroll.payroll_id} className="border-b border-gray-300">
                <td className="py-2 px-4">
                  {payroll.pay_period_start.toString().split("T")[0]}
                </td>
                <td className="py-2 px-4">
                  {payroll.pay_period_end.toString().split("T")[0]}
                </td>
                <td className="py-2 px-4">{payroll.bonuses}</td>
                <td className="py-2 px-4">{payroll.deductions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PayrollsList;
