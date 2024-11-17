import { IStudentInfo } from "../components/EditProfileStudent/EditProfileStudent";
import { IExperience } from "./Experience";

export interface IStudent {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    university: string | null;
    lastYear: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    keySkills: string[] | [];
    preferredFields: string[] | [];
    locationPreferences: string[] | [];
    roles: UserRoles[] | [];
    photo: string | null;
    profession: string;
    experiences: IExperience[]
}

export interface IStudentUpdate extends IStudentInfo {
}

export interface IStudentUpdateFile {
    addFile?: File;
}

export enum UserRoles {
    Student = 'student',
    Company = 'company',
    Admin = 'admin',
}