import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/public.route.tsx';
import { privateRoutes } from './routes/private.route.tsx';
import "./style/scss/registration.scss";
import { useEffect } from 'react';
import Header from './components/Header/Header.tsx';
import { useProfession } from './store/profession.store.ts';
import { useUser } from './store/user.store.ts';

function App() {
  const { checkAuth, setIsLoading, isAuth } = useUser()
  const { setProfessions } = useProfession()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkAuth(token)
    } else {
      setIsLoading(false)
    }
    setProfessions()
  }, [])

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          {
            isAuth ?
            <>
              {privateRoutes.map((route, index) => (
                  <Route path={route.path} element={route.element} key={index} />
              ))}
            </>
            :
            <>
              {publicRoutes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))}
            </>
          }
        </Routes>
      </BrowserRouter>
  )
}

export default App