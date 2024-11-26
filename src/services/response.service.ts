import $api from "../http";
import { AxiosResponse } from "axios";
import { Response_Reponse } from "../models/response/Response_Response";

export default class ResponseService {
  private static readonly controllerPrefix = "response";

  static async addStudentResponse(
    studentId: number,
    vacancyId: number
  ): Promise<AxiosResponse<Response_Reponse>> {
    return $api.post<Response_Reponse>(`${this.controllerPrefix}/create`, {
      studentId,
      vacancyId,
    });
  }

  static async getCompanyResponses(): Promise<
    AxiosResponse<Response_Reponse[]>
  > {
    return $api.get<Response_Reponse[]>(
      `${this.controllerPrefix}/findAllCompany`
    );
  }

  static async getStudentResponses(): Promise<
    AxiosResponse<Response_Reponse[]>
  > {
    return $api.get<Response_Reponse[]>(
      `${this.controllerPrefix}/findAllStudent`
    );
  }
}
