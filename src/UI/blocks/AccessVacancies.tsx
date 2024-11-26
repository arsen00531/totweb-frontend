import { ICompany } from "../../models/Company";

type Props = {
  company: ICompany;
};

const AccessVacancies = ({ company }: Props) => {
  return (
    <div className="vacancies">
      <h4>Доступные вакансии</h4>
      {company?.vacancies &&
        company.vacancies.map((vacancy) => (
          <p key={vacancy.id}>{vacancy.id}</p>
        ))}
    </div>
  );
};

export default AccessVacancies;
