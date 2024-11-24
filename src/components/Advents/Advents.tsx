import { Container } from "react-bootstrap";
import cl from "./_Advents.module.scss";

const Advents = () => {
  return (
    <section style={{ textAlign: "center" }}>
      <Container>
        <h1 className={"mb-5"}>Преимущества платформы</h1>
        <div className={cl.adventsBlocks}>
          <div className={cl.adventsBlock}>
            <h4>Поддержка университета</h4>
            <p>
              Все компании проверены и одобрены вашим университетом для
              уверенности в качестве
            </p>
          </div>
          <div className={cl.adventsBlock}>
            <h4>Персонализированные рекомендации</h4>
            <p>
              Получайте предложения на основе ваших интересов и академических
              достижений
            </p>
          </div>
          <div className={cl.adventsBlock}>
            <h4>Простой вход через университет</h4>
            <p>
              Авторизуйтесь через унивеситетский аккаунт для быстрого доступа к
              возможностям
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Advents;
