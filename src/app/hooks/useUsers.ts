import useData from "./useData";


export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    picture: string;
    email: string;
    password: string;
    phone_number: string;
    hire_date: Date;
    job_title: string;
  }

const useUsers = () => useData("/admin/user");

export default useUsers;