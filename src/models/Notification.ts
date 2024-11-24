import { ICompany } from "./Company";
import { IStudent } from "./User";
import { IVacancy } from "./Vacancy";

export interface INotification {
  id: number;
  company: ICompany;
  student: IStudent;
  vacancy: IVacancy;
}
