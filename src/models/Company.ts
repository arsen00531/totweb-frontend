import { UserRoles } from "./User";

export interface ICompany {
    id: number | null;
    companyName: string | null;
    email: string | null;
    contactPerson: string | null;
    phone: string | null;
    role: UserRoles[] | [];
}