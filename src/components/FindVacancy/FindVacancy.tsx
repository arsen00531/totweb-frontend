import { Container } from "react-bootstrap"
import HomeButton from "../../UI/buttons/HomeButton"
import cl from "./_FindVacancy.module.scss"

const FindVacancy = () => {
  return (
    <section className={cl.findInternship}>
      <Container className={"pt-5 pb-5"}>
        <h2 className={""}>Найдите идеальную стажировку для вашего профессионального роста</h2>
        <h4 className={""}>Мы связываем студентов с ведущими компаниями для возможности работы и карьерного развития</h4>
        <HomeButton text={""} />
      </Container>
    </section>
  )
}

export default FindVacancy