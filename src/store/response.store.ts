import { create } from "zustand";
import { IResponse } from "../models/Response";
import ResponseService from "../services/response.service";

export interface ResponseState {
  companyResponses: IResponse[];
  studentResponses: IResponse[];
  isLoading: boolean;
  setCompanyResponses: () => void;
  setStudentResponses: () => void;
  addStudentResponse: (studentId: number, vacancyId: number, studentResponses: IResponse[]) => Promise<void>;
  setIsLoading: (bool: boolean) => void;
}

export const useResponse = create<ResponseState>((set) => ({
  companyResponses: [],
  studentResponses: [],
  isLoading: true,
  setCompanyResponses: async () => {
    try {
      const responses = await ResponseService.getCompanyResponses();
      set({ companyResponses: responses.data });
    } finally {
      set({ isLoading: false });
    }
  },
  setStudentResponses: async () => {
    try {
      const responses = await ResponseService.getStudentResponses();
      set({ studentResponses: responses.data });
    } finally {
      set({ isLoading: false });
    }
  },
  addStudentResponse: async (studentId: number, vacancyId: number, studentResponses: IResponse[]) => {
    const response = await ResponseService.addStudentResponse(studentId, vacancyId)
    studentResponses.push(response.data)

    set({ studentResponses: studentResponses })
  },
  setIsLoading: (bool: boolean) => {
    set({ isLoading: bool });
  },
}));
