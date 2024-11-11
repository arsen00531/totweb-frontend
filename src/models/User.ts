export interface IStudent {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: UserRoles[] | [];
}

export enum UserRoles {
    Student = 'student',
    Company = 'company',
    Admin = 'admin'
}