// import { create } from "zustand";
// import { IStudent } from "../models/User";
// import axios, { AxiosError } from "axios";
// import { API_URL } from "../http";
// import { StudentAuthService } from "../services/auth.service";
// import { StudentAuthReponse } from "../models/response/AuthResponse";

// export interface StudentState extends IStudent {
//     isAuth: boolean;
//     isLoading: boolean;
//     setUser: (user: IStudent) => void;
//     setIsAuth: (bool: boolean) => void;
//     setIsLoading: (bool: boolean) => void;
//     updateUserInfo: (user: IStudent) => void;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
//     checkAuth: () => Promise<void>
// }

// export const useStudent = create<StudentState>((set) => ({
//     id: null,
//     firstName: null,
//     lastName: null,
//     email: null,
//     isAuth: false,
//     isLoading: true,
//     role: [],

//     setUser: (user: IStudent) => {
//         set(user)
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
//             const response = await StudentAuthService.login(email, password)
            
//             localStorage.setItem('token', response.data.accessToken)
//             set({ ...response.data.student, isAuth: true })
//         } catch (error) {
//             throw error
//         }
//     },
//     logout: async () => {
//         try {
//             await StudentAuthService.logout()
//             localStorage.removeItem('token')
//             set({ isAuth: false, firstName: '', lastName: '', email: '' })
//         } catch (error) {
//             throw error
//         }
//     },
//     checkAuth: async () => {
//         set({ isLoading: true })
//         try {
//             const response = await axios.get<StudentAuthReponse>(`${API_URL}/user/refresh`, { withCredentials: true })
//             localStorage.setItem('token', response.data.accessToken)
//             set({ isAuth: true, ...response.data.student })
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