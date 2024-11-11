import { create } from "zustand";
import { IStudent, UserRoles } from "../models/User";
import { ICompany } from "../models/Company";
import { CompanyAuthService, StudentAuthService } from "../services/auth.service";
import axios, { AxiosError } from "axios";
import { API_URL } from "../http";
import { CompanyAuthReponse, StudentAuthReponse } from "../models/response/AuthResponse";
import { parseJwt } from "../utils/jwt/decodeJWT";

export interface UserState {
    student: IStudent | null;
    company: ICompany | null;
    isAuth: boolean;
    isLoading: boolean;
    role: UserRoles[] | null;
    login: (email: string, password: string, role: UserRoles[]) => Promise<void>;
    setStudent: (student: IStudent) => void;
    setIsAuth: (bool: boolean) => void;
    setIsLoading: (bool: boolean) => void;
    updateStudentInfo: (student: IStudent) => void;
    logout: (role: UserRoles) => Promise<void>;
    checkAuth: (localStorageToken: string) => Promise<void>
}

export const useUser = create<UserState>((set) => ({
    student: null,
    company: null,
    isAuth: false,
    isLoading: true,
    role: [],

    login: async (email: string, password: string, role: UserRoles[]) => {
        if (role.includes(UserRoles.Student)) {
            const response = await StudentAuthService.login(email, password)
        
            localStorage.setItem('token', response.data.accessToken)
            set({ student: response.data.student, isAuth: true, role: role })
        } else if (role.includes(UserRoles.Company)) {
            const response = await CompanyAuthService.login(email, password)
        
            localStorage.setItem('token', response.data.accessToken)
            set({ company: response.data.company, isAuth: true, role: role })
        }
    },
    setStudent: (student: IStudent) => {
        set({ student })
    },
    setIsAuth: (bool: boolean) => {
        set({ isAuth: bool })
    },
    setIsLoading: (bool: boolean) => {
        set({ isLoading: bool })
    },
    updateStudentInfo: (student: IStudent) => {
        set({ student })
    },
    logout: async (role: UserRoles) => {
        try {
            if (role === UserRoles.Student) {
                await StudentAuthService.logout()
            } else {
                await CompanyAuthService.logout()
            }
            localStorage.removeItem('token')
            set({ isAuth: false, student: null, company: null, role: [] })
        } catch (error) {
            throw error
        }
    },
    checkAuth: async (localStorageToken: string) => {
        set({ isLoading: true })
        try {
            const payload = parseJwt(localStorageToken)
            let response;
            if (payload?.role.includes(UserRoles.Student)) {
                response = await axios.get<StudentAuthReponse>(`${API_URL}/user/refresh`, { withCredentials: true })
                localStorage.setItem('token', response.data.accessToken)
                set({ isAuth: true, student: response.data.student, role: payload.role })
            } else if (payload?.role.includes(UserRoles.Company)) {
                response = await axios.get<CompanyAuthReponse>(`${API_URL}/company/refresh`, { withCredentials: true })
                localStorage.setItem('token', response.data.accessToken)
                set({ isAuth: true, company: response.data.company, role: payload.role })
            }
        } catch (error) {
            const err = error as AxiosError
            if (err.status === 401) {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token')
                }
            }
        } finally {
            set({ isLoading: false })
        }
    }
}))