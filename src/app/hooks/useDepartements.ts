import useData from "./useData";

export interface Departement {
  department_id: number;
  department_name: string;
}

const useDepartements = () => useData<Departement>("/admin/departement");

export default useDepartements;
