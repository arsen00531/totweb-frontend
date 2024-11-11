import Auth from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Vacancy from "../pages/Vacancies/Vacancies";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, VACANCY } from "../utils/constants/routes.constants";

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    element: <Registration />
  }, 
  {
    path: LOGIN_ROUTE,
    element: <Auth />
  }, 
  {
    path: VACANCY,
    element: <Vacancy />
  }, 
  {
    path: HOME_ROUTE,
    element: <Home />
  }, 
]