import axios from "axios";
import { parseJwt } from "../utils/jwt/decodeJWT";
import { UserRoles } from "../models/User";
import { CompanyAuthService, StudentAuthService } from "../services/auth.service";

export const API_URL = import.meta.env.VITE_HOST_BACKEND

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if(error.response.status === 401 && error.config && !error.config._isRetry) {
            error.config._isRetry = true
            try {
                const token = localStorage.getItem('token')
                const decode = parseJwt(token)
                let response;
                if (decode?.role.includes(UserRoles.Student)) {
                    response = await StudentAuthService.refresh()
                } else if (decode?.role.includes(UserRoles.Company)) {
                    response = await CompanyAuthService.refresh()
                }

                if (response) {
                    localStorage.setItem('token', response.data.accessToken)
                    return $api.request(originalRequest)
                }
            } catch {
                console.log("НЕ АВТОРИЗОВАН")
            }
        }

        throw error
    }
)

export default $api