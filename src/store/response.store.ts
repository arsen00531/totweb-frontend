import { create } from "zustand";
import { IResponse } from "../models/Response";
import ResponseService from "../services/response.service";

export interface ResponseState {
    companyResponses: IResponse[];
    studentResponses: IResponse[];
    isLoading: boolean;
    setCompanyResponses: () => void;
    setStudentResponses: () => void;
    setIsLoading: (bool: boolean) => void;
}

export const useResponse = create<ResponseState>((set) => ({
    companyResponses: [],
    studentResponses: [],
    isLoading: true,
    setCompanyResponses: async () => {
        try {
            const response = await ResponseService.getCompanyResponses()
            set({ companyResponses: response.data })
        } finally {
            set({ isLoading: false })
        }
    },
    setStudentResponses: async () => {
        try {
            const response = await ResponseService.getStudentResponses()
            set({ studentResponses: response.data })
        } finally {
            set({ isLoading: false })
        }
    },
    setIsLoading: (bool: boolean) => {
        set({ isLoading: bool })
    },
}))