import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import {
  EDIT_PROFILE_ROUTE,
  LOGIN_ROUTE,
} from "../../utils/constants/routes.constants";
import { useUser } from "../../store/user.store";

const ProfileButtons = () => {
  const { roles, logout } = useUser();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (roles) {
      await logout(roles);
    }
    navigate(LOGIN_ROUTE);
  };

  return (
    <div>
      <MDBBtn
        color={"danger"}
        onClick={logoutHandler}
        type={"button"}
        style={{ marginRight: "1em" }}
      >
        Выйти
      </MDBBtn>
      <MDBBtn onClick={() => navigate(EDIT_PROFILE_ROUTE)} type={"button"}>
        Редактировать профиль
      </MDBBtn>
    </div>
  );
};

export default ProfileButtons;
