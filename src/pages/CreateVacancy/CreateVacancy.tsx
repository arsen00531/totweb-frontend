import { Container } from "react-bootstrap";
import cl from "./_CreateVacancy.module.scss";
import { TFormVacancy } from "./types";
import { useVacancy } from "../../store/vacancy.store";
import { PROFILE_ROUTE } from "../../utils/constants/routes.constants";
import { useEffect, useState } from "react";
import { IVacancyCreate, IVacancyUpdate } from "../../models/Vacancy";
import { graphicConfig } from "../Vacancies/config/graphic.config";
import { useProfession } from "../../store/profession.store";
import { useLocation } from "react-router-dom";
import VacancyService from "../../services/vacancy.service";
import VacancyForm from "../../UI/forms/VacancyForm";

export interface IVacancyInfo {
  graphic: boolean[];
  profession: boolean[];
  duties: string[];
  requirements: string[];
  conditions: string[];
}

const CreateVacancy = () => {
  const { state }: { state: number } = useLocation();
  const { createVacancy, updateVacancy } = useVacancy();
  const [status, setStatus] = useState(false);

  const [vacancyInfo, setVacancyInfo] = useState<IVacancyInfo>({
    graphic: Array.from({ length: graphicConfig.length })
      .fill(null)
      .map(() => false),
    profession: [],
    duties: [],
    requirements: [],
    conditions: [],
  });

  const [initialForm, setInitalForm] = useState({
    title: "",
    description: "",
    city: "",
    price: "",
  });

  const [isProfessionSelected, setIsProfessionSelected] = useState(true);
  const [isGraphicSelected, setIsGraphicSelected] = useState(true);
  const { professions } = useProfession();

  useEffect(() => {
    const profess = Array.from({ length: professions.length }, () => false);
    setVacancyInfo({ ...vacancyInfo, profession: profess });

    setVacancy(profess);
  }, [professions]);

  const setVacancy = async (profess: boolean[]) => {
    if (state) {
      const vacancyResponse = await VacancyService.findOne(state);

      if (vacancyResponse.data) {
        const vacancy = vacancyResponse.data;

        const professMap = profess.map((_, index) => professions[index].id === vacancy.profession.id ? true : false)

        setVacancyInfo({
          graphic: vacancyInfo.graphic.map((_, index) => vacancy.graphic.includes(graphicConfig[index].id)),
          profession: professMap,
          duties: vacancy.duties ?? [],
          requirements: vacancy.requirements,
          conditions: vacancy.conditions,
        });
        
        setInitalForm({
          title: vacancy.title,
          description: vacancy.description,
          city: vacancy.city,
          price: vacancy.price ?? "",
        });
      }
    }

    setStatus(true);
  };


  const onSubmit = (async (data: TFormVacancy) => {
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


  return (
    <Container className={cl.createVacancy + " pt-5"}>
      <h2>{state ? "Изменить вакансию" : "Создать вакансию"}</h2>
      {status ? (
        <VacancyForm
          onSubmit={onSubmit}
          isGraphicSelected={isGraphicSelected}
          isProfessionSelected={isProfessionSelected}
          professions={professions}
          setIsGraphicSelected={setIsGraphicSelected}
          setIsProfessionSelected={setIsGraphicSelected}
          vacancyInfo={vacancyInfo}
          initialForm={initialForm}
          state={state}
          setVacancyInfo={setVacancyInfo}
        />
      ) : (
        <p>Loading</p>
      )}
    </Container>
  );
};

export default CreateVacancy;
