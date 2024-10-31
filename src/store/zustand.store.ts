import { create } from "zustand";
import { User } from "../types/user";

export interface UserState extends User {
    isUser: boolean,
    setUser: (user: UserState) => void;
    updateUserInfo: (user: User) => void;
}

export const useUser = create<UserState>((set) => ({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    isUser: false,
    setUser: (user: UserState) => {
        set(user)
    },
    updateUserInfo: (user: User) => {
        set(user)
    }
}))