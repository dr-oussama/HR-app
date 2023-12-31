import create from "./http-service";
import { User } from "./user-service";

export interface DocumentRequest {
  request_id: number;
  user_id: number;
  request_date: string;
  request_message: string;
  status: string;
  user: User;
}

export default create("/document-request");
