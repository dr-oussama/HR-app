import create from "./http-service";

export interface Document {
  document_id: number;
  user_id: number;
  document_name: string;
  document_file: string;
}

export default create("/document");
