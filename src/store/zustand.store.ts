import { create } from "zustand";

export interface UserState {
    first_name: string;
    last_name: string;
    password: string;
    confirmation: string;
    email: string;
    setUserInfo: (user: User) => void
}

export interface User extends Partial<UserState> {}

export const useUser = create<UserState>((set) => ({
    first_name: '',
    last_name: '',
    password: '',
    confirmation: '',
    email: '',
    createUser: (user: UserState) => {
        set(user)
    },
    setUserInfo: (user: User) => {
        set(user)
    }
}))