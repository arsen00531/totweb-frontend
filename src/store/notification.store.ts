import { create } from "zustand";
import { INotification } from "../models/Notification";
import { NotificationService } from "../services/notification.service";
import { isAccessCompanyPayload, parseJwt } from "../utils/jwt/decodeJWT";
import { UserRoles } from "../models/User";

export interface NotificationState {
  companyNotifications: INotification[];
  isLoading: boolean;
  create: (companyId: number, studentId: number) => Promise<void>;
  setCompanyNotifications: () => void;
  setIsLoading: (bool: boolean) => void;
}

export const useNotification = create<NotificationState>((set) => ({
  companyNotifications: [],
  isLoading: true,
  create: async (companyId: number, studentId: number) => {
    await NotificationService.create(companyId, studentId);
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
