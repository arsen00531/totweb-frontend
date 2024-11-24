import { Form } from "react-bootstrap";
import { useUser } from "../../store/user.store";
import cl from "../../pages/Profile/_Profile.module.scss";
import cl_company from "../ProfileCompany/_ProfileCompany.module.scss";
import { useEffect, useState } from "react";
import { IVacancy } from "../../models/Vacancy";
import { MDBBtn } from "mdb-react-ui-kit";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  CREATE_VACANCY_ROUTE,
  DETAILED_VACANCY_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/constants/routes.constants";

export interface ICompanyInfo {
  industry: string | null;
  location: string | null;
  size: string | null;
  aboutUs: string[];
  projects: string[];
  vacancies: IVacancy[];
  contactEmail: string | null;
  contactPhone: string | null;
  social: string | null;
}

const EditProfileCompany = () => {
  const { company, updateCompanyInfo } = useUser();
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>({
    industry: "",
    location: "",
    size: "",
    aboutUs: ["one", "two"],
    projects: [],
    vacancies: [],
    contactEmail: "",
    contactPhone: "",
    social: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (company) {
      setCompanyInfo(company);
    }
  }, [company]);

  const handleUpdate = () => {
    if (companyInfo && company && company.id) {
      updateCompanyInfo(companyInfo, company.id);

      navigate(PROFILE_ROUTE);
    }
  };

  const addProject = () => {
    companyInfo.projects.push("");
    setCompanyInfo({ ...companyInfo });
  };

  const addAbout = () => {
    companyInfo.aboutUs.push("");
    setCompanyInfo({ ...companyInfo });
  };

  const addVacancy = () => {
    navigate(CREATE_VACANCY_ROUTE);
  };

  return (
    <div className={cl.profileContainer + " container mt-5 p-3 mb-5"}>
      <Form>
        <div className={cl.edit_company_info + " " + cl.edit_infos}>
          <h4>Основная информация</h4>
          <Form.Group className={cl.formGroup}>
            <p>Отрасль: </p>
            <Form.Control
              placeholder="Отрасль"
              value={companyInfo.industry ?? ""}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, industry: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className={cl.formGroup}>
            <p>Местоположение: </p>
            <Form.Control
              placeholder="Местоположение"
              value={companyInfo.location ?? ""}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, location: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className={cl.formGroup}>
            <p>Размер компании: </p>
            <Form.Control
              placeholder="Размер компании"
              value={companyInfo.size ?? ""}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, size: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className={"about_us " + cl.edit_infos}>
          <h4>О нас</h4>
          {companyInfo?.aboutUs &&
            companyInfo.aboutUs.map((about, index) => (
              <Form.Group className={cl.formGroup} key={index}>
                <p>Абзац: {index + 1}</p>
                <textarea
                  className={"form-control mb-3"}
                  id="exampleFormControlTextarea1"
                  rows={3}
                  placeholder="О нас"
                  value={about}
                  onChange={(e) => {
                    const newAbouts = companyInfo.aboutUs.map((newAbout, i) =>
                      i === index ? e.target.value : newAbout
                    );
                    setCompanyInfo({ ...companyInfo, aboutUs: newAbouts });
                  }}
                ></textarea>

                <button
                  className={cl.trash}
                  type={"button"}
                  onClick={() => {
                    setCompanyInfo({
                      ...companyInfo,
                      aboutUs: companyInfo.aboutUs.filter(
                        (_, i) => i !== index
                      ),
                    });
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </Form.Group>
            ))}
          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={addAbout}
          >
            Добавить абзац
          </MDBBtn>
        </div>
        <div className={cl.project_achievements}>
          <h4>Проекты и достижения</h4>
          <ul>
            {companyInfo?.projects &&
              companyInfo.projects.map((project, index) => (
                <Form.Group className={cl.formGroup} key={index}>
                  <p>Проект {index + 1}: </p>
                  <Form.Control
                    placeholder="Описание"
                    value={project}
                    onChange={(e) => {
                      const newProjects = companyInfo.projects.map(
                        (newProject, i) =>
                          i === index ? e.target.value : newProject
                      );
                      setCompanyInfo({ ...companyInfo, projects: newProjects });
                    }}
                  />
                  <button
                    className={cl.trash}
                    type={"button"}
                    onClick={() => {
                      setCompanyInfo({
                        ...companyInfo,
                        projects: companyInfo.projects.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </Form.Group>
              ))}
          </ul>
          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={addProject}
          >
            Добавить проект
          </MDBBtn>
        </div>
        <div className="vacancies">
          <h4>Доступные вакансии</h4>
          {companyInfo?.vacancies &&
            companyInfo.vacancies.map((vacancy) => (
              <div key={vacancy.id} className={cl_company.accessVacancy + " mb-3"}>
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
          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={addVacancy}
          >
            Создать вакансию
          </MDBBtn>
        </div>
        <div className={cl.contactInfo}>
          <h4>Контактная информация</h4>
          <Form.Group className={cl.formGroup}>
            <p>Электронная почта: </p>
            <Form.Control
              placeholder="Почта"
              value={companyInfo?.contactEmail ?? ""}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, contactEmail: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className={cl.formGroup}>
            <p>Телефон: </p>
            <Form.Control
              placeholder="Номер телефона"
              value={companyInfo?.contactPhone ?? ""}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, contactPhone: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className={cl.formGroup}>
            <p>Соц.сети: </p>
            <Form.Control
              placeholder="Соц.сети"
              value={companyInfo?.social ?? ""}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, social: e.target.value })
              }
            />
          </Form.Group>
        </div>

        <MDBBtn type={"button"} onClick={handleUpdate}>
          Сохранить
        </MDBBtn>
      </Form>
    </div>
  );
};

export default EditProfileCompany;
