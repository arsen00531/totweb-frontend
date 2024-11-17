import $api, { API_URL } from "../http";
import axios, { AxiosResponse } from "axios";
import { CompanyAuthReponse, StudentAuthReponse } from "../models/response/AuthResponse";

export class StudentAuthService {
    private static readonly controllerPrefix = "student"

    static async registration(firstName: string, lastName: string, email: string, password: string): Promise<AxiosResponse<StudentAuthReponse>> {
        return $api.post<StudentAuthReponse>(`${this.controllerPrefix}/registration`, {firstName, lastName, email, password })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<StudentAuthReponse>> {
        return await axios.post<StudentAuthReponse>(`${API_URL}/${this.controllerPrefix}/login`, { email, password }, { withCredentials: true })
    }

    static async logout(): Promise<void> {
        $api.get(`${this.controllerPrefix}/logout`)
    }

    static async refresh(): Promise<AxiosResponse<StudentAuthReponse>> {
        return $api.get<StudentAuthReponse>(`${this.controllerPrefix}/refresh`)
    }

    static async refreshState(): Promise<AxiosResponse<StudentAuthReponse>> {
        return axios.get<StudentAuthReponse>(`${API_URL}/${this.controllerPrefix}/refresh`, { withCredentials: true })
    }
}

export class CompanyAuthService {
    private static readonly controllerPrefix = "company"

    static async registration(companyName: string, email: string, password: string, contactPerson: string, phone: string): Promise<AxiosResponse<CompanyAuthReponse>> {
        return $api.post<CompanyAuthReponse>(`${this.controllerPrefix}/registration`, {companyName, email, password, contactPerson, phone })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<CompanyAuthReponse>> {
        return await axios.post<CompanyAuthReponse>(`${API_URL}/${this.controllerPrefix}/login`, { email, password }, { withCredentials: true })
    }

    static async logout(): Promise<void> {
        $api.get(`${this.controllerPrefix}/logout`)
    }

    static async refresh(): Promise<AxiosResponse<CompanyAuthReponse>> {
        return $api.get<CompanyAuthReponse>(`${this.controllerPrefix}/refresh`)
    }

    static async refreshState(): Promise<AxiosResponse<CompanyAuthReponse>> {
        return axios.get<CompanyAuthReponse>(`${API_URL}/${this.controllerPrefix}/refresh`, { withCredentials: true })
    }
}