import create from "./http-service";

export interface Payroll {
  payroll_id: number;
  user_id: number;
  pay_period_start: string;
  pay_period_end: string;
  bonuses: number;
  deductions: number;
}

export default create("/admin/user");
