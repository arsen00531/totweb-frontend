import { IVacancy } from "../../models/Vacancy"

type Props = {
    cl: CSSModuleClasses,
    vacancy: IVacancy
}

const DescriptionVacancy = ({ cl, vacancy }: Props) => {
  return (
    <div className={cl.descriptionAbout}>
      { vacancy.description }
    </div>
  )
}

export default DescriptionVacancy