import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/public.route.tsx";
import { noAuthRoutes, privateRoutes } from "./routes/private.route.tsx";
import Header from "./components/Header/Header.tsx";
import { useProfession } from "./store/profession.store.ts";
import { useUser } from "./store/user.store.ts";
import "./style/scss/registration.scss";
import { LOGIN_ROUTE } from "./utils/constants/routes.constants.ts";
import { useNotification } from "./store/notification.store.ts";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  const { checkAuth, setIsLoading, isAuth, roles } = useUser();
  const { setProfessions } = useProfession();
  const { setCompanyNotifications } = useNotification();

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const check = await checkAuth(token);

      if (check === false) {
        window.location.replace(
          `${import.meta.env.VITE_HOST_FRONTEND}${LOGIN_ROUTE}`
        );
      }
    } else {
      setIsLoading(false);
    }
    setProfessions();
    setCompanyNotifications();
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {isAuth ? (
          <>
            {privateRoutes.map((route, index) => (
              <React.Fragment key={index}>
                {roles && roles?.some((role) => route.roles.includes(role)) && (
                  <Route path={route.path} element={route.element} />
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {noAuthRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </>
        )}
        {publicRoutes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
