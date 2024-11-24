import { useUser } from "../../store/user.store";
import cl from "./_ProfileCompany.module.scss";
import ProfileButtons from "../../UI/buttons/ProfileButtons";
import { MDBBtn } from "mdb-react-ui-kit";
import { DETAILED_VACANCY_ROUTE } from "../../utils/constants/routes.constants";
import { useNavigate } from "react-router-dom";

const ProfileCompany = () => {
  const navigate = useNavigate();
  const { company } = useUser();

  return (
    <>
      <div className="common_info">
        <div className={cl.editProfile}>
          <h4 style={{ borderBottom: "none" }}>Основная информация</h4>
          <ProfileButtons />
        </div>
        <p className="mt-2">Отрасль: {company?.industry ?? "не указано"}</p>
        <p className="mt-2">Местоположение: {company?.location ?? "не указано"}</p>
        <p className="mt-2">Размер компании: {company?.size ?? "не указано"}</p>
      </div>
      <div className="about_us">
        <h4>О нас</h4>
        {company?.aboutUs &&
          company.aboutUs.map((about, index) => <p key={index}>{about}</p>)}
      </div>
      <div className="project_achievements">
        <h4>Проекты и достижения</h4>
        <ul>
          {company?.projects &&
            company.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
        </ul>
      </div>
      <div className="vacancies">
        <h4>Доступные вакансии</h4>
        {company?.vacancies &&
          company.vacancies.map((vacancy) => (
            <div key={vacancy.id} className={cl.accessVacancy + " mb-3"}>
              <h3>{vacancy.title}</h3>
              <MDBBtn
                type={"button"}
                onClick={() =>
                  navigate(DETAILED_VACANCY_ROUTE, {
                    state: vacancy.id,
                  })
                }
              >
                Открыть
              </MDBBtn>
            </div>
          ))}
      </div>
      <div className="contact">
        <h4>Контактная информация</h4>
        {company?.contactEmail && (
          <p>Электронная почта: {company.contactEmail}</p>
        )}
        {company?.contactPhone && <p>Телефон: {company.contactPhone}</p>}
        {company?.social && <p>Соц.сети: {company.social}</p>}
      </div>
    </>
  );
};

export default ProfileCompany;
