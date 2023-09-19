import create from "./http-service";

export interface User {
  user_id: number;
  cin: string;
  first_name: string;
  last_name: string;
  picture: string;
  email: string;
  password: string;
  phone_number: string;
  hire_date: string;
  job_title: string;
  basic_salary: number;
  departement_id: number;
}

export default create('/admin/user');