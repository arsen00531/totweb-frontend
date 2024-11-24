import { Container } from 'react-bootstrap'
import cl from './_DetailedVacancy.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import VacancyService from '../../services/vacancy.service'
import { IVacancy } from '../../models/Vacancy'
import { months } from '../Vacancies/config/month'
import DescriptionVacancy from '../../components/DescriptionVacancy/DescriptionVacancy'
import { VACANCY_ROUTE } from '../../utils/constants/routes.constants'
import { MDBBtn } from 'mdb-react-ui-kit'
import { useUser } from '../../store/user.store'
import { UserRoles } from '../../models/User'

const DetailedVacancy = () => {
    const { roles } = useUser()
    const { state } = useLocation()
    const navigate = useNavigate()
    const [vacancy, setVacancy] = useState<IVacancy>()

    useEffect(() => {
        if (state) {
            setVacancyById(state)
        } else {
            navigate(VACANCY_ROUTE)
        }
    }, [])

    const setVacancyById = async (state: number) => {
        const response = await VacancyService.findOne(state)

        if (!response.data) {
            navigate(VACANCY_ROUTE)
        }

        response.data.createdAt = new Date(response.data.createdAt)
        setVacancy(response.data)
    }

    return (
        <div className={cl.detailedVacancy}>
            <Container className={"mt-5"}>
                <div className={cl.start}>
                    <h1 className={"mb-3"}>{vacancy?.title}</h1>
                    <p className={cl.descTitle}>
                        {
                            vacancy?.createdAt && <>{vacancy.createdAt.getDate()} {vacancy.createdAt && months[vacancy.createdAt.getMonth()]} {vacancy.createdAt.getFullYear()} • </>
                        }
                        { vacancy?.city + " •" } { vacancy?.company && vacancy.company.companyName }
                    </p>
                </div>

                <div className={cl.descriptionVacancy + ' mb-5'}>
                    {
                        vacancy && vacancy.company && <DescriptionVacancy cl={cl} vacancy={vacancy} />
                    }
                </div>
                <div className={cl.duties + " mb-5"}>
                    <h2 className='mb-4'>Обязанности</h2>
                    <ul>
                        {
                            vacancy?.duties &&
                                vacancy.duties.map(
                                    (dutie, index) => 
                                    <li key={index}>{dutie}</li>
                            )
                        }
                    </ul>
                </div>
                <div className={cl.requirements + " mb-5"}>
                    <h2 className='mb-4'>Требования</h2>
                    <ul>
                        {
                            vacancy?.requirements &&
                                vacancy.requirements.map(
                                    (requirement, index) => 
                                    <li key={index}>{requirement}</li>
                            )
                        }
                    </ul>
                </div>
                <div className={cl.conditions + " mb-5"}>
                    <h2 className='mb-4'>Условия</h2>
                    <ul>
                        {
                            vacancy?.conditions &&
                                vacancy.conditions.map(
                                    (condition, index) => 
                                    <li key={index}>{condition}</li>
                            )
                        }
                    </ul>
                </div>

                {
                    roles?.includes(UserRoles.Student) && 
                        <MDBBtn className='mb-5'>
                            Откликнуться
                        </MDBBtn>
                }
            </Container>
        </div>
    )
}

export default DetailedVacancy