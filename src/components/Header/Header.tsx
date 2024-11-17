import React, { useEffect, useState } from 'react';
import cl from './_Header.module.scss'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUser } from '../../store/user.store';
import HeaderNavbarButton from '../../UI/blocks/HeaderNavbarButton';
import { HOME_ROUTE, VACANCY_ROUTE } from '../../utils/constants/routes.constants';

const Header = () => {
  const { isAuth, isLoading, student, company, roles } = useUser()
  const [burgerOpen, setBurgerOpen] = useState(false)
  const expand = 'md'
  
  useEffect(() => {
    // Отслеживание изменений в списке классов
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Список классов изменился
          if (!document.body.classList.contains('modal-open')) {
            setBurgerOpen(false)
          } else {
            setBurgerOpen(true)
          }
        }
      }
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header>
        <Navbar expand={expand} className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand as={Link} to={'/'}>Totweb</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className={cl.my_navbar_toggler_icon} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Totweb
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={HOME_ROUTE}>Home</Nav.Link>
                  <Nav.Link as={Link} to={VACANCY_ROUTE}>Vacancies</Nav.Link>
                  <HeaderNavbarButton 
                    cl={cl}
                    isLoading={isLoading}
                    isAuth={isAuth}
                    student={student}
                    company={company}
                    roles={roles}
                    burgerOpen={burgerOpen}
                  />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </header>
  )
}

export default React.memo(Header)