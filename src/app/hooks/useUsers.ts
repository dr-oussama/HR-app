import { CanceledError } from "@/services/api-client";
import userService, { User } from "@/services/user-service";
import { useState, useEffect } from "react";

const useUsers = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
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

export const addUser = async (newUser: User) => {
  try {
    const response = await userService.create<User>(newUser);
    return response.data;
  } catch (error) {
    throw new Error("Error adding user");
  }
};

export default useUsers;
