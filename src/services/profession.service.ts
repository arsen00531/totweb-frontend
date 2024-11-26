import $api from "../http";
import { AxiosResponse } from "axios";
import { ProfessionReponse } from "../models/response/ProfessionResponse";

export default class ProfessionService {
  private static readonly controllerPrefix = "profession";

  static async findAll(): Promise<AxiosResponse<ProfessionReponse[]>> {
    return $api.get<ProfessionReponse[]>(`${this.controllerPrefix}/findAll`);
  }
}
