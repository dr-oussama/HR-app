import { CanceledError } from "@/services/api-client";
import userService, { Department } from "@/services/departement-service";
import { useState, useEffect } from "react";

const useDepartements = () => {
  const [error, setError] = useState("");
  const [departements, setDepartements] = useState<Department[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<Department>();
    request
      .then((res) => {
        setDepartements(res.data);
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
    departements,
    error,
    isLoading,
    setDepartements,
    setError,
  };
};

export const addDepartement = async (departement: Department) => {
  try {
    const response = await userService.create<Department>(departement);
    return response.data;
  } catch (error) {
    throw new Error("Error adding payroll");
  }
};

export const updateDepartement = async (departement: Department) => {
  try {
    console.log(departement);
    const response = await userService.update<Department>(
      departement,
      departement.department_id
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export default useDepartements;
