import create from "./http-service";

export interface DocumentRequest {
  request_id: number;
  user_id: number;
  admin_id: number;
  request_date: Date;
  request_message: string;
  status: string;
}

export default create("/document-request");
