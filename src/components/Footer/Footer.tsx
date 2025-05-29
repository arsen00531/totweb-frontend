import cl from "./_Footer.module.scss"
import logo from "../../assets/logo.png"

function Footer() {
  return (
    <footer className={cl.footer}>
      <img src={logo} alt="logo" />
      <p>
        Проект создан при поддержке Федерального государственного бюджетного учреждения "Фонд содействия развитию малых форм предприятий в научно-технической сфере  в рамках программы "Студенческий стартап" федерального проекта "Платформа университетского технологического предпринимательства
      </p>
    </footer>
  )
}

export default Footer