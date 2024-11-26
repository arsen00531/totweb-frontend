import { IStudent } from "./User";
import { IVacancy } from "./Vacancy";

export interface IResponse {
    id: number
    student: IStudent
    vacancy: IVacancy;
}