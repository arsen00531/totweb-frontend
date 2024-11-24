import { Button, ButtonGroup, Container, Form } from "react-bootstrap";
import cl from "./_FindVacancy.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VACANCY_ROUTE } from "../../utils/constants/routes.constants";

const FindVacancy = () => {
  const [vacancy, setVacancy] = useState("");
  const navigate = useNavigate();

  const keyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && vacancy.length !== 0) {
      navigate(VACANCY_ROUTE, { state: vacancy });
    }
  };

  const click = () => {
    if (vacancy.length !== 0) {
      navigate(VACANCY_ROUTE, { state: vacancy });
    }
  };

  return (
    <section className={cl.findInternship}>
      <Container className={"pt-5 pb-5"}>
        <h2 className={""}>
          Найдите идеальную стажировку для вашего профессионального роста
        </h2>
        <h4 className={"mb-5"}>
          Мы связываем студентов с ведущими компаниями для возможности работы и
          карьерного развития
        </h4>
        <ButtonGroup style={{ minWidth: "50%" }}>
          <Form.Control
            onKeyDown={keyDown}
            placeholder="Найти вакансию"
            value={vacancy}
            onChange={(e) => setVacancy(e.target.value)}
          />
          <Button onClick={click}>Найти</Button>
        </ButtonGroup>
      </Container>
    </section>
  );
};

export default React.memo(FindVacancy);
