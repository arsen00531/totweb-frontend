import { create } from "zustand";
import { IStudent, IStudentUpdate, UserRoles } from "../models/User";
import { ICompany } from "../models/Company";
import {
  CompanyAuthService,
  StudentAuthService,
} from "../services/auth.service";
import { AxiosError } from "axios";
import { parseJwt } from "../utils/jwt/decodeJWT";
import { ICompanyInfo } from "../components/EditProfileCompany/EditProfileCompany";
import { CompanyService, StudentService } from "../services/user.service";

export interface UserState {
  student: IStudent | null;
  company: ICompany | null;
  isAuth: boolean;
  isLoading: boolean;
  roles: UserRoles[] | null;
  login: (email: string, password: string, role: UserRoles[]) => Promise<void>;
  setStudent: (student: IStudent) => void;
  setIsAuth: (bool: boolean) => void;
  setIsLoading: (bool: boolean) => void;
  updateStudentInfo: (student: IStudentUpdate, id: number) => Promise<void>;
  updateCompanyInfo: (
    updateCompanyInfo: ICompanyInfo,
    id: number
  ) => Promise<void>;
  logout: (role: UserRoles[]) => Promise<void>;
  checkAuth: (localStorageToken: string) => Promise<boolean | undefined>;
}

export const useUser = create<UserState>((set) => ({
  student: null,
  company: null,
  isAuth: false,
  isLoading: true,
  roles: [],

  login: async (email: string, password: string, role: UserRoles[]) => {
    if (role.includes(UserRoles.Student)) {
      const response = await StudentAuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      set({ student: response.data.student, isAuth: true, roles: role });
    } else if (role.includes(UserRoles.Company)) {
      const response = await CompanyAuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      set({ company: response.data.company, isAuth: true, roles: role });
    }
  },
  setStudent: (student: IStudent) => {
    set({ student });
  },
  setIsAuth: (bool: boolean) => {
    set({ isAuth: bool });
  },
  setIsLoading: (bool: boolean) => {
    set({ isLoading: bool });
  },
  updateStudentInfo: async (updateStudentInfo: IStudentUpdate, id: number) => {
    const student = await StudentService.update(updateStudentInfo, id);
    const data = student.data;

    set({ student: { ...data } });
  },
  updateCompanyInfo: async (updateCompanyInfo: ICompanyInfo, id: number) => {
    const company = await CompanyService.update(updateCompanyInfo, id);
    const data = company.data;

    set({ company: { ...data } });
  },
  logout: async (roles: UserRoles[]) => {
    if (roles.includes(UserRoles.Student)) {
      await StudentAuthService.logout();
    } else if (roles.includes(UserRoles.Company)) {
      await CompanyAuthService.logout();
    }
    localStorage.removeItem("token");
    set({ isAuth: false, student: null, company: null, roles: [] });
  },
  checkAuth: async (localStorageToken: string) => {
    set({ isLoading: true });
    try {
      const payload = parseJwt(localStorageToken);
      let response;
      if (payload?.role.includes(UserRoles.Student)) {
        response = await StudentAuthService.refreshState();
        localStorage.setItem("token", response.data.accessToken);
        set({
          isAuth: true,
          student: response.data.student,
          roles: payload.role,
        });

        return true
      } else if (payload?.role.includes(UserRoles.Company)) {
        response = await CompanyAuthService.refreshState();
        localStorage.setItem("token", response.data.accessToken);
        set({
          isAuth: true,
          company: response.data.company,
          roles: payload.role,
        });

        return true
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
      }

      return false
    } finally {
      set({ isLoading: false });
    }
  },
}));
