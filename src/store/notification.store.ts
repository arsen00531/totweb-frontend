import { create } from "zustand";
import { INotification } from "../models/Notification";
import { NotificationService } from "../services/notification.service";
import { isAccessCompanyPayload, parseJwt } from "../utils/jwt/decodeJWT";
import { UserRoles } from "../models/User";

export interface NotificationState {
  companyNotifications: INotification[];
  isLoading: boolean;
  createNotification: (companyId: number, studentId: number, vacancyId: number) => Promise<void>;
  setCompanyNotifications: () => void;
  setIsLoading: (bool: boolean) => void;
}

export const useNotification = create<NotificationState>((set) => ({
  companyNotifications: [],
  isLoading: true,
  createNotification: async (companyId: number, studentId: number, vacancyId: number) => {
    await NotificationService.create(companyId, studentId, vacancyId);
  },
  setCompanyNotifications: async () => {
    try {
      const payload = parseJwt(localStorage.getItem("token"));
      if (
        payload?.role.includes(UserRoles.Company) &&
        isAccessCompanyPayload(payload)
      ) {
        const response = await NotificationService.findByCompany(
          payload.companyId
        );
        set({ companyNotifications: response.data });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  setIsLoading: (bool: boolean) => {
    set({ isLoading: bool });
  },
}));
