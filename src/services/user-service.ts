import create from "./http-service";
import { Payroll } from "./payroll-service";

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
  department_id: number;
  payroll: Payroll[];
}

export default create("/admin/user");
