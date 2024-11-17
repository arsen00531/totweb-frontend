import { UserRoles } from "./User";
import { IVacancy } from "./Vacancy";

export interface ICompany {
    id: number | null;
    companyName: string | null;
    email: string | null;
    contactPerson: string | null;
    phone: string | null;
    industry: string;
    location: string;
    size: string;
    aboutUs: string[];
    contactEmail: string;
    contactPhone: string;
    site: string
    social: string;
    projects: string[];
    reviews: string[];
    vacancies: IVacancy[];
    roles: UserRoles[] | [];
}