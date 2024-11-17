import $api from "../http";
import { AxiosResponse } from "axios";
import { VacancyReponse } from "../models/response/VacancyResponse";
import { IFindAllVacancyQuery } from "../models/queries/findAllVacancy.query";

export default class VacancyService {
    private static readonly controllerPrefix = "vacancy"

    static async findAll(findAllQuery?: IFindAllVacancyQuery): Promise<AxiosResponse<VacancyReponse[]>> {
        return $api.get<VacancyReponse[]>(`${this.controllerPrefix}/findAll`, { params: findAllQuery })
    }

    static async findOne(id: number): Promise<AxiosResponse<VacancyReponse>> {
        return $api.get<VacancyReponse>(`${this.controllerPrefix}/findOne`, { params: { id: String(id) } })
    }
}