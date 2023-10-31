import create from "./http-service";

export interface Department {
  department_id: number;
  department_name: string;
}

export default create("/departement");
