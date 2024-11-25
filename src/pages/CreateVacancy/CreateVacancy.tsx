import { Button, Container, Form } from "react-bootstrap";
import cl from "./_CreateVacancy.module.scss";
import { useForm } from "react-hook-form";
import { TFormTextConfigVacancy, TFormVacancy } from "./types";
import { VacancyCreateSchema } from "./config/userShema";
import { formTextVacancy } from "./config/formTextConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "../../components/FormTextInput/FormTextInput";
import { useVacancy } from "../../store/vacancy.store";
import { PROFILE_ROUTE } from "../../utils/constants/routes.constants";
import { useEffect, useState } from "react";
import { IVacancyCreate, IVacancyUpdate } from "../../models/Vacancy";
import { graphicConfig } from "../Vacancies/config/graphic.config";
import CheckBox from "../../UI/inputs/CheckBox";
import { useProfession } from "../../store/profession.store";
import { MDBBtn } from "mdb-react-ui-kit";
import { FaRegTrashAlt } from "react-icons/fa";
import TextError from "../../UI/errors/TextError";
import { useLocation } from "react-router-dom";
import VacancyService from "../../services/vacancy.service";

interface IVacancyInfo {
  graphic: boolean[];
  profession: boolean[];
  duties: string[];
  requirements: string[];
  conditions: string[];
}

const CreateVacancy = () => {
  const { state }: { state: number } = useLocation()
  const { professions } = useProfession();
  const { createVacancy, updateVacancy } = useVacancy();

  const [vacancyInfo, setVacancyInfo] = useState<IVacancyInfo>({
    graphic: Array.from({ length: graphicConfig.length })
      .fill(null)
      .map(() => false),
    profession: [],
    duties: [],
    requirements: [],
    conditions: [],
  });

  const [isProfessionSelected, setIsProfessionSelected] = useState(true)
  const [isGraphicSelected, setIsGraphicSelected] = useState(true)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormVacancy>({
    resolver: zodResolver(VacancyCreateSchema),
    mode: "onBlur",
  });
  const formTextConfig: TFormTextConfigVacancy[] = formTextVacancy(
    register,
    errors
  );

  const onSubmit = handleSubmit(async (data: TFormVacancy) => {
    const graphicsInfo = graphicConfig.filter((_, i) =>
      vacancyInfo.graphic[i] ? true : false
    );
    const graphics = graphicsInfo.map((_, i) => graphicsInfo[i].id);
    const profIndex = vacancyInfo.profession.indexOf(true);

    if (profIndex === -1) {
      setIsProfessionSelected(false)
      return
    }

    if (graphics.length === 0) {
      setIsGraphicSelected(false)
      return
    }

    const profession = professions[profIndex];

    if (state) {
      const updateVacancyDto: IVacancyUpdate = {
        ...data,
        graphic: graphics,
        duties: vacancyInfo.duties,
        requirements: vacancyInfo.requirements,
        conditions: vacancyInfo.conditions,
        professionId: profession.id,
      }

      await updateVacancy(state, updateVacancyDto)
      window.location.replace(`${import.meta.env.VITE_HOST_FRONTEND}${PROFILE_ROUTE}`);

      return
    }

    const vacancyCreate: IVacancyCreate = {
      ...data,
      price: data.price,
      graphic: graphics,
      professionId: profession.id,
      duties: vacancyInfo.duties,
      requirements: vacancyInfo.requirements,
      conditions: vacancyInfo.conditions
    };

    await createVacancy(vacancyCreate);

    window.location.replace(`${import.meta.env.VITE_HOST_FRONTEND}${PROFILE_ROUTE}`);
  });

  const setVacancy = async () => {
    if (state) {
      const vacancyResponse = await VacancyService.findOne(state)

      if (vacancyResponse.data) {
        const vacancy = vacancyResponse.data

        setVacancyInfo({
          graphic: vacancyInfo.graphic,
          profession: vacancyInfo.profession,
          duties: vacancy.duties ?? [],
          requirements: vacancy.requirements,
          conditions: vacancy.conditions,
        })
      }
    }
  }

  useEffect(() => {
    setVacancy()
  }, []);

  useEffect(() => {
    const profess = Array.from({ length: professions.length }, () => false);
    setVacancyInfo({ ...vacancyInfo, profession: profess });
  }, [professions]);

  return (
    <Container className={cl.createVacancy + " pt-5"}>
      <h2>{ state ? "Изменить вакансию" : "Создать вакансию" }</h2>

      <Form className={cl.createForm + " p-3"}>
        {formTextConfig.map((formInput, index) => (
          <FormTextInput
            key={index}
            maxLength={formInput.maxLength}
            error={formInput.error}
            name={formInput.name}
            isTextarea={formInput.name === "description"}
            register={formInput.register}
            title={formInput.title}
            type={formInput.type}
          />
        ))}

        <div className={cl.graphics}>
          <h4>График работы</h4>
          {graphicConfig.map((config, index) => (
            <CheckBox
              key={index}
              label={config.label}
              name="graphic"
              id={config.id}
              checked={vacancyInfo.graphic[index]}
              onChange={() =>
                setVacancyInfo({
                  ...vacancyInfo,
                  graphic: vacancyInfo.graphic.map((graphic, i) =>
                    index === i ? !vacancyInfo.graphic[index] : graphic
                  ),
                })
              }
            />
          ))}
          {
            !isGraphicSelected && <TextError error={"Выберите график работы"} />
          }
        </div>

        <div className="professions">
          <h4>Профессия</h4>
          {vacancyInfo.profession.map((profession, index) => (
            <CheckBox
              key={index}
              label={professions[index].name ?? ""}
              name={professions[index].name ?? ""}
              checked={profession}
              onChange={() =>
                setVacancyInfo({
                  ...vacancyInfo,
                  profession: vacancyInfo.profession.map((_, i) =>
                    index === i ? !profession : false
                  ),
                })
              }
            />
          ))}
          {
            !isProfessionSelected && <TextError error={"Выберите профессию"} />
          }
        </div>

        <div className={cl.duties + " mb-5"}>
          <h2 className="mb-4">Обязанности</h2>
          <ul>
            {vacancyInfo?.duties && vacancyInfo.duties.length !== 0 ? (
              vacancyInfo?.duties.map((dutie, index) => (
                <Form.Group className={"formGroup"} key={index}>
                  <Form.Control
                    placeholder="Описание"
                    value={dutie}
                    onChange={(e) => {
                      const newDuties = vacancyInfo.duties.map(
                        (newProject, i) =>
                          i === index ? e.target.value : newProject
                      );
                      setVacancyInfo({ ...vacancyInfo, duties: newDuties });
                    }}
                  />
                  <button
                    className={"trash"}
                    type={"button"}
                    onClick={() => {
                      setVacancyInfo({
                        ...vacancyInfo,
                        duties: vacancyInfo.duties.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </Form.Group>
              ))
            ) : (
              <p>Не указано</p>
            )}
          </ul>

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={() => {
              vacancyInfo.duties.push("");
              setVacancyInfo({ ...vacancyInfo, duties: vacancyInfo.duties });
            }}
          >
            Добавить Обязанность
          </MDBBtn>
        </div>

        <div className={"requirements mb-5"}>
          <h2 className="mb-4">Требования</h2>
          <ul>
            {vacancyInfo?.requirements &&
            vacancyInfo.requirements.length !== 0 ? (
              vacancyInfo?.requirements.map((requirement, index) => (
                <Form.Group className={"formGroup"} key={index}>
                  <Form.Control
                    placeholder="Описание"
                    value={requirement}
                    onChange={(e) => {
                      const newRequirements = vacancyInfo.requirements.map(
                        (newProject, i) =>
                          i === index ? e.target.value : newProject
                      );
                      setVacancyInfo({
                        ...vacancyInfo,
                        requirements: newRequirements,
                      });
                    }}
                  />
                  <button
                    className={"trash"}
                    type={"button"}
                    onClick={() => {
                      setVacancyInfo({
                        ...vacancyInfo,
                        requirements: vacancyInfo.requirements.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </Form.Group>
              ))
            ) : (
              <p>Не указано</p>
            )}
          </ul>

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={() => {
              vacancyInfo.requirements.push("");
              setVacancyInfo({
                ...vacancyInfo,
                requirements: vacancyInfo.requirements,
              });
            }}
          >
            Добавить требование
          </MDBBtn>
        </div>

        <div className={"conditions mb-5"}>
          <h2 className="mb-4">Условия</h2>
          <ul>
            {vacancyInfo?.conditions && vacancyInfo.conditions.length !== 0 ? (
              vacancyInfo?.conditions.map((condition, index) => (
                <Form.Group className={"formGroup"} key={index}>
                  <Form.Control
                    placeholder="Описание"
                    value={condition}
                    onChange={(e) => {
                      const newConditions = vacancyInfo.conditions.map(
                        (newProject, i) =>
                          i === index ? e.target.value : newProject
                      );
                      setVacancyInfo({
                        ...vacancyInfo,
                        conditions: newConditions,
                      });
                    }}
                  />
                  <button
                    className={"trash"}
                    type={"button"}
                    onClick={() => {
                      setVacancyInfo({
                        ...vacancyInfo,
                        conditions: vacancyInfo.conditions.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </Form.Group>
              ))
            ) : (
              <p>Не указано</p>
            )}
          </ul>

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={() => {
              vacancyInfo.conditions.push("");
              setVacancyInfo({
                ...vacancyInfo,
                conditions: vacancyInfo.conditions,
              });
            }}
          >
            Добавить абзац
          </MDBBtn>
        </div>

        <Button type={"button"} onClick={onSubmit}>{ state ? "Сохранить" : "Создать" }</Button>
      </Form>
    </Container>
  );
};

export default CreateVacancy;
