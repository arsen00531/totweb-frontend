import { UserRoles } from "../models/User";
import Auth from "../pages/Auth/Auth";
import CreateVacancy from "../pages/CreateVacancy/CreateVacancy";
import Profile from "../pages/Profile/Profile";
import Registration from "../pages/Registration/Registration";
import {
  CREATE_VACANCY_ROUTE,
  EDIT_PROFILE_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATION_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  VISIT_PROFILE_ROUTE,
} from "../utils/constants/routes.constants";
import EditProfile from "../pages/EditProfile/EditProfile";
import Notification from "../pages/Notification/Notification";
import VisitProfile from "../pages/VisitProfile/VisitProfile";

export const privateRoutes = [
  {
    roles: [UserRoles.Company, UserRoles.Student],
    path: PROFILE_ROUTE,
    element: <Profile />,
  },
  {
    roles: [UserRoles.Company],
    path: VISIT_PROFILE_ROUTE,
    element: <VisitProfile />,
  },
  {
    roles: [UserRoles.Company, UserRoles.Student],
    path: EDIT_PROFILE_ROUTE,
    element: <EditProfile />,
  },
  {
    roles: [UserRoles.Company],
    path: CREATE_VACANCY_ROUTE,
    element: <CreateVacancy />,
  },
  {
    roles: [UserRoles.Company],
    path: NOTIFICATION_ROUTE,
    element: <Notification />,
  },
];

export const noAuthRoutes = [
  {
    path: REGISTRATION_ROUTE,
    element: <Registration />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
];
