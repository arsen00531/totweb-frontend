import DetailedVacancy from "../pages/DetailedVacancy/DetailedVacancy";
import Home from "../pages/Home/Home";
import Vacancy from "../pages/Vacancies/Vacancies";
import { DETAILED_VACANCY_ROUTE, HOME_ROUTE, VACANCY_ROUTE } from "../utils/constants/routes.constants";

export const publicRoutes = [
  {
    path: VACANCY_ROUTE,
    element: <Vacancy />
  }, 
  {
    path: DETAILED_VACANCY_ROUTE,
    element: <DetailedVacancy />
  },
  {
    path: HOME_ROUTE,
    element: <Home />
  }, 
]