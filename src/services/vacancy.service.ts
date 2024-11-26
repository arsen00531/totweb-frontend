import $api from "../http";
import { AxiosResponse } from "axios";
import { VacancyReponse } from "../models/response/VacancyResponse";
import { IFindAllVacancyQuery } from "../models/queries/findAllVacancy.query";
import { IVacancyCreate, IVacancyUpdate } from "../models/Vacancy";

export default class VacancyService {
  private static readonly controllerPrefix = "vacancy";

  static async create(
    vacancy: IVacancyCreate
  ): Promise<AxiosResponse<VacancyReponse>> {
    return $api.post<VacancyReponse>(
      `${this.controllerPrefix}/create`,
      vacancy
    );
  }

  static async findAll(
    findAllQuery?: IFindAllVacancyQuery
  ): Promise<AxiosResponse<VacancyReponse[]>> {
    return $api.get<VacancyReponse[]>(`${this.controllerPrefix}/findAll`, {
      params: findAllQuery,
    });
  }

  static async findOne(id: number): Promise<AxiosResponse<VacancyReponse>> {
    return $api.get<VacancyReponse>(`${this.controllerPrefix}/findOne`, {
      params: { id: String(id) },
    });
  }

  static async update(
    id: number,
    updateVacancyDto: IVacancyUpdate
  ): Promise<AxiosResponse<VacancyReponse>> {
    return $api.put<VacancyReponse>(
      `${this.controllerPrefix}/update`,
      updateVacancyDto,
      {
        params: { id: String(id) },
      }
    );
  }

  static async delete(id: number): Promise<AxiosResponse<VacancyReponse>> {
    return $api.delete<VacancyReponse>(`${this.controllerPrefix}/delete`, {
      params: { id: String(id) },
    });
  }
}
