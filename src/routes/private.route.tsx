import Home from "../pages/Home/Home";
import Vacancy from "../pages/Vacancies/Vacancies";
import { HOME_ROUTE, VACANCY } from "../utils/constants/routes.constants";

export const privateRoutes = [
  {
    path: VACANCY,
    element: <Vacancy />
  }, 
  {
    path: HOME_ROUTE,
    element: <Home />
  }, 
]