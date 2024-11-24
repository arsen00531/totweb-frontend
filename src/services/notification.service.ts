import $api from "../http";
import { INotificationResponse } from "../models/response/NotificationResponse";

export class NotificationService {
  private static readonly controllerPrefix = "notification";

  static async create(companyId: number, studentId: number) {
    return $api.post<INotificationResponse>(`${this.controllerPrefix}/create`, {
      companyId,
      studentId,
    });
  }

  static async findByCompany(companyId: number) {
    return $api.get<INotificationResponse[]>(`${this.controllerPrefix}/findByCompany`, {
      params: {
        companyId,
      },
    });
  }
}
