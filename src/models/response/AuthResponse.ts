import { ICompany } from "../Company";
import { IStudent } from "../User";

export interface StudentAuthReponse {
    accessToken: string,
    refreshToken: string,
    student: IStudent
}

export interface CompanyAuthReponse {
    accessToken: string,
    refreshToken: string,
    company: ICompany
}