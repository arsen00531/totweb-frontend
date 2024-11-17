import { Nav } from "react-bootstrap"
import { ICompany } from "../../models/Company"
import { IStudent, UserRoles } from "../../models/User"
import { Link } from "react-router-dom"
import SignButton from "../buttons/SignButton"
import { PROFILE_ROUTE } from "../../utils/constants/routes.constants"

type Props = {
    cl: CSSModuleClasses,
    isLoading: boolean,
    isAuth: boolean,
    student: IStudent | null,
    company: ICompany | null,
    roles: UserRoles[] | null,
    burgerOpen: boolean
}

const HeaderNavbarButton = ({ cl, isLoading, isAuth, student, company, roles, burgerOpen }: Props) => {
  return (
    <div className={cl.my_navbar_button_group}>
        {
            !isLoading && 
            <>
            {
                isAuth ?
                <>
                    <Nav.Link as={Link} to={PROFILE_ROUTE}>{roles?.includes(UserRoles.Student) && student?.firstName || roles?.includes(UserRoles.Company) && company?.contactPerson}</Nav.Link>
                </> :
                <>
                    <SignButton burgerOpen={burgerOpen} cl={cl} />
                </>
            }
            </>
        }
    </div>
  )
}

export default HeaderNavbarButton