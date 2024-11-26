import { useForm } from "react-hook-form";
import FormTextInput from "../../components/FormTextInput/FormTextInput";
import { TFormTextConfigVacancy, TFormVacancy } from "../../pages/CreateVacancy/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { VacancyCreateSchema } from "../../pages/CreateVacancy/config/userShema";
import { formTextVacancy } from "../../pages/CreateVacancy/config/formTextConfig";
import { Button, Form } from "react-bootstrap";
import { graphicConfig } from "../../pages/Vacancies/config/graphic.config";
import CheckBox from "../inputs/CheckBox";
import TextError from "../errors/TextError";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProfession } from "../../store/profession.store";
import { FaRegTrashAlt } from "react-icons/fa";
import { MDBBtn } from "mdb-react-ui-kit";
import { IVacancyInfo } from "../../pages/CreateVacancy/CreateVacancy";
import { IProfession } from "../../models/Profession";
import cl from "../../pages/CreateVacancy/_CreateVacancy.module.scss";

type Props = {
  initialForm?: TFormVacancy;
  setVacancyInfo : React.Dispatch<SetStateAction<IVacancyInfo>>,
  vacancyInfo : IVacancyInfo,
  professions : IProfession[],
  isProfessionSelected : boolean,
  setIsProfessionSelected : React.Dispatch<SetStateAction<boolean>>,
  isGraphicSelected : boolean,
  setIsGraphicSelected : React.Dispatch<SetStateAction<boolean>>,
  state : number,
  onSubmit : (data: TFormVacancy) => Promise<void>
};

const VacancyForm = ({
  initialForm = {
    title: "",
    description: "",
    city: "",
    price: "",
  },
  professions,
  isGraphicSelected,
  isProfessionSelected,
  setIsGraphicSelected,
  setIsProfessionSelected,
  state,
  setVacancyInfo,
  vacancyInfo,
  onSubmit
}: Props) => {




  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormVacancy>({
    defaultValues: {
      ...initialForm
    },
    resolver: zodResolver(VacancyCreateSchema),
    mode: "onBlur",
  });


  const formTextConfig: TFormTextConfigVacancy[] = formTextVacancy(
    register,
    errors
  );

  const submitHandler = handleSubmit( (data : TFormVacancy) => {
    onSubmit(data)
  } )

  return (
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

    <Button type={"button"} onClick={submitHandler}>{ state ? "Сохранить" : "Создать" }</Button>
  </Form>
  );
};

export default VacancyForm;
