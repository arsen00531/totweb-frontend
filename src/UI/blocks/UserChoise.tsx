import { MDBBtn } from "mdb-react-ui-kit"
import { UserRoles } from "../../models/User"

type Props = {
  title: string,
  setUser: React.Dispatch<React.SetStateAction<UserRoles | undefined>>
}

const UserChoise = ({ title, setUser }: Props) => {
  return (
    <div className="auth-form-container">
        <div className="form-wrapper" style={{ textAlign: "center", maxWidth: "500px" }}>
            <h2>{title}</h2>
            <p>Пожалуйста выберите какого типа ваш аккаунт</p>
            <MDBBtn size="lg" style={{ width: "40%" }} onClick={() => setUser(UserRoles.Student)}>Студент</MDBBtn>
            <MDBBtn size="lg" style={{ width: "40%" }} onClick={() => setUser(UserRoles.Company)}>Компания</MDBBtn>
        </div>
    </div>
  )
}

export default UserChoise