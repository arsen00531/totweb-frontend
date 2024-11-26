import { create } from "zustand";
import { IVacancy, IVacancyCreate, IVacancyUpdate } from "../models/Vacancy";
import VacancyService from "../services/vacancy.service";
import { IFindAllVacancyQuery } from "../models/queries/findAllVacancy.query";

export interface VacancyState {
  vacancies: IVacancy[];
  currentPage: number;
  isLoading: boolean;
  setVacancies: (searchValue?: string | undefined) => void;
  setIsLoading: (bool: boolean) => void;
  createVacancy: (vacancy: IVacancyCreate) => Promise<void>;
  updateCurrentPage: (page: number) => void;
  updateVacancies: (findAllQuery?: IFindAllVacancyQuery) => Promise<void>;
  updateVacancy: (
    id: number,
    updateVacancyDto: IVacancyUpdate
  ) => Promise<void>;
  deleteVacancy: (vacancyId: number, vacancies: IVacancy[]) => Promise<void>;
  addVacancies: (
    vacancies: IVacancy[],
    findAllQuery?: IFindAllVacancyQuery
  ) => Promise<void>;
}

export const useVacancy = create<VacancyState>((set) => ({
  vacancies: [],
  currentPage: 0,
  isLoading: true,
  setVacancies: async (searchValue?: string | undefined) => {
    try {
      const response = await VacancyService.findAll(
        searchValue
          ? { page: 1, limit: 10, search: searchValue }
          : { page: 1, limit: 10 }
      );
      const data = response.data.map((vacancy) => {
        vacancy.createdAt = new Date(vacancy.createdAt);
        return vacancy;
      });
      set({ vacancies: data, currentPage: 1 });
    } finally {
      set({ isLoading: false });
    }
  },
  setIsLoading: (bool: boolean) => {
    set({ isLoading: bool });
  },
  createVacancy: async (vacancy: IVacancyCreate) => {
    await VacancyService.create(vacancy);
  },
  updateCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
  updateVacancies: async (findAllQuery?: IFindAllVacancyQuery) => {
    const newVacancies = await VacancyService.findAll(findAllQuery);
    const data = newVacancies.data.map((vacancy) => {
      vacancy.createdAt = new Date(vacancy.createdAt);
      return vacancy;
    });
    set({
      vacancies: data,
      currentPage: findAllQuery?.page && findAllQuery.page,
    });
  },
  updateVacancy: async (id: number, updateVacancyDto: IVacancyUpdate) => {
    await VacancyService.update(id, updateVacancyDto);
  },
  deleteVacancy: async (vacancyId: number, vacancies: IVacancy[]) => {
    await VacancyService.delete(vacancyId);
    const updatedVacancies = vacancies.filter(
      (vacancy) => vacancy.id !== vacancyId
    );

    set({ vacancies: updatedVacancies });
  },
  addVacancies: async (
    vacancies: IVacancy[],
    findAllQuery?: IFindAllVacancyQuery
  ) => {
    const newVacancies = await VacancyService.findAll(findAllQuery);
    const data = newVacancies.data.map((vacancy) => {
      vacancy.createdAt = new Date(vacancy.createdAt);
      return vacancy;
    });
    set({
      vacancies: [...vacancies, ...data],
      currentPage: findAllQuery?.page && findAllQuery.page,
    });
  },
}));
