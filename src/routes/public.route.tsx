import Auth from "../pages/Auth/Auth";
import Registration from "../pages/Registration/Registration";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constants/routes.constants";

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    element: <Registration />
  }, 
  {
    path: LOGIN_ROUTE,
    element: <Auth />
  },  
]