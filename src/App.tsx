import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/public.route.tsx';
import "./style/scss/registration.scss";
import { CookiesProvider } from 'react-cookie';

function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => <Route path={route.path} element={route.element} key={index} />)}
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
