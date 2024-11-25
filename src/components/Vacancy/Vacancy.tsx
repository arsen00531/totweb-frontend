import { Button } from "react-bootstrap";
import { IVacancy } from "../../models/Vacancy";
import { MdOutlinePlace } from "react-icons/md";
import { PiTreeStructureLight } from "react-icons/pi";
import cl from "./_Vacancy.module.scss";
import { months } from "../../pages/Vacancies/config/month";
import H2Black from "../../UI/text/H2Black";
import { useNavigate } from "react-router-dom";
import { DETAILED_VACANCY_ROUTE } from "../../utils/constants/routes.constants";
import { useUser } from "../../store/user.store";
import { UserRoles } from "../../models/User";
import { FaRegTrashAlt } from "react-icons/fa";
import { useVacancy } from "../../store/vacancy.store";
import PencilButton from "../../UI/buttons/PencilButton";

type Props = {
  vacancy: IVacancy;
};

const Vacancy = ({ vacancy }: Props) => {
  const { roles } = useUser();
  const { vacancies, deleteVacancy } = useVacancy();
  const navigate = useNavigate();

  return (
    <div className={"p-4 mb-4 bg-body " + cl.vacancy}>
      {vacancy && (
        <>
          {roles?.includes(UserRoles.Admin) && (
            <>
              <PencilButton
                style={{ position: "absolute", right: "3.5em", top: "1em" }}
              />
              <button
                className={cl.trash}
                type={"button"}
                onClick={() => deleteVacancy(vacancy.id, vacancies)}
              >
                <FaRegTrashAlt />
              </button>
            </>
          )}
          <H2Black>{vacancy.title}</H2Black>
          <div className={cl.line + " mb-4 ms-1"}>
            <div className={cl.innerLine}>
              <div className={cl.companyName + " gap-2"}>
                <MdOutlinePlace size={25} style={{ opacity: "0.8" }} />
                <p>{vacancy.city}</p>
              </div>
              <div className={cl.companyName + " gap-2"}>
                <PiTreeStructureLight size={25} />
                <p>{vacancy.company.companyName}</p>
              </div>
            </div>
          </div>
          <p className={"mb-3 ms-1"}>{vacancy.description}</p>
          <Button
            size={"lg"}
            className={cl.moreDetail}
            onClick={() => {
              navigate(DETAILED_VACANCY_ROUTE, { state: vacancy.id });
            }}
          >
            Подробнее
          </Button>
          <p className={cl.vacancyDate}>
            {vacancy.createdAt.getDate()} {months[vacancy.createdAt.getMonth()]}{" "}
            {vacancy.createdAt.getFullYear()}
          </p>
        </>
      )}
    </div>
  );
};

export default Vacancy;
