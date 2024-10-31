import axios, { AxiosError } from "axios";
import { User } from "../../types/user";
import { getCookie } from 'typescript-cookie'

const token = getCookie('token')
const bearer = `Bearer ${token}`

const headerAuth = { Authorization: bearer }

interface ICreateUser extends Omit<User, 'id'> {
    password: string
}

interface ILoginUser {
    email: string
    password: string
}

export const createUser = async (user: ICreateUser) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_HOST_BACKEND}/user/create`,
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password
            }
        );

        return response.data
    } catch (error) {
        throw error as AxiosError
    }
}

export const loginUser = async (user: ILoginUser) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_HOST_BACKEND}/user/login`,
            {
              email: user.email,
              password: user.password
            },
        );

        return response.data
    } catch (error) {
        throw error as AxiosError
    }
}

export const findAll = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_HOST_BACKEND}/user/findAll`,
            {
                headers: headerAuth
            }
        );

        return response.data
    } catch (error) {
        throw error as AxiosError
    }
}