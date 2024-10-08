import { CanceledError } from "@/services/api-client";
import userService, { Payroll } from "@/services/payroll-service";
import { useState, useEffect } from "react";

const usePayrolls = () => {
  const [error, setError] = useState("");
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<Payroll>();
    request
      .then((res) => {
        setPayrolls(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return {
    payrolls: payrolls,
    error,
    isLoading,
    setPayrolls: setPayrolls,
    setError,
  };
};
export const getOne = (id: number) => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState<Payroll>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getOne<Payroll>(id);
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export const addPayroll = async (payroll: Payroll) => {
  try {
    const response = await userService.create<Payroll>(payroll);
    return response.data;
  } catch (error) {
    throw new Error("Error adding payroll");
  }
};

export const updatePayroll = async (payroll: Payroll) => {
  try {
    console.log(payroll);
    const response = await userService.update<Payroll>(
      payroll,
      payroll.user_id
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export const getOneUser = async (userId: number): Promise<Payroll> => {
  try {
    const response = await userService.getOne<Payroll>(userId);
    return (await response.request).data;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export default usePayrolls;
