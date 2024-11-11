import { create } from "zustand";
import ProfessionService from "../services/profession.service";
import { IProfession } from "../models/Profession";

export interface ProfessionState {
    professions: IProfession[];
    isLoading: boolean;
    setProfessions: () => void;
    setIsLoading: (bool: boolean) => void;
}

export const useProfession = create<ProfessionState>((set) => ({
    professions: [],
    isLoading: true,
    setProfessions: async () => {
        try {
            const response = await ProfessionService.findAll()
            set({ professions: response.data })
        } finally {
            set({ isLoading: false })
        }
    },
    setIsLoading: (bool: boolean) => {
        set({ isLoading: bool })
    },
}))