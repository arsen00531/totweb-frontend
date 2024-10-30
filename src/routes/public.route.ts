import Auth from "../pages/Auth";
import Registration from "../pages/Registration";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constants/routes.constants";

export default [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration
  },   
]