// import { create } from "zustand";
// import { IStudent } from "../models/User";
// import axios, { AxiosError } from "axios";
// import { API_URL } from "../http";
// import { CompanyAuthService } from "../services/auth.service";
// import { ICompany } from "../models/Company";
// import { CompanyAuthReponse } from "../models/response/AuthResponse";

// export interface CompanyState extends ICompany {
//     isAuth: boolean;
//     isLoading: boolean;
//     setUser: (company: ICompany) => void;
//     setIsAuth: (bool: boolean) => void;
//     setIsLoading: (bool: boolean) => void;
//     updateUserInfo: (user: IStudent) => void;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
//     checkAuth: () => Promise<void>
// }

// export const useCompany = create<CompanyState>((set) => ({
//     id: null,
//     companyName: null,
//     email: null,
//     contactPerson: null,
//     phone: null,
//     isAuth: false,
//     isLoading: true,
//     role: [],

//     setUser: (company: ICompany) => {
//         set(company)
//     },
//     setIsAuth: (bool: boolean) => {
//         set({ isAuth: bool })
//     },
//     setIsLoading: (bool: boolean) => {
//         set({ isLoading: bool })
//     },
//     updateUserInfo: (user: IStudent) => {
//         set(user)
//     },
//     login: async (email: string, password: string) => {
//         try {
//             const response = await CompanyAuthService.login(email, password)
            
//             localStorage.setItem('token', response.data.accessToken)
//             set({ ...response.data.company, isAuth: true })
//         } catch (error) {
//             throw error
//         }
//     },
//     logout: async () => {
//         try {
//             await CompanyAuthService.logout()
//             localStorage.removeItem('token')
//             set({ isAuth: false, companyName: null, email: null, contactPerson: null, phone: null })
//         } catch (error) {
//             throw error
//         }
//     },
//     checkAuth: async () => {
//         set({ isLoading: true })
//         try {
//             const response = await axios.get<CompanyAuthReponse>(`${API_URL}/company/refresh`, { withCredentials: true })
//             localStorage.setItem('token', response.data.accessToken)
//             set({ isAuth: true, ...response.data.company })
//         } catch (error) {
//             const err = error as AxiosError
//             if (err.status === 401) {
//                 if (localStorage.getItem('token')) {
//                     localStorage.removeItem('token')
//                 }
//             }
//         } finally {
//             set({ isLoading: false })
//         }
//     }
// }))