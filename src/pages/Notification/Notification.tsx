import { Container } from "react-bootstrap";
import cl from "./_Notification.module.scss";
import { useNotification } from "../../store/notification.store";
import { Link } from "react-router-dom";
import { VISIT_PROFILE_ROUTE } from "../../utils/constants/routes.constants";

const Notification = () => {
  const { companyNotifications } = useNotification();

  return (
    <Container>
      <h1 className={"mb-5 mt-5"}>Уведомления</h1>
      <div className={cl.notificationContainer + " container mt-5 p-3 pt-4"}>
        {companyNotifications &&
          companyNotifications.length !== 0 &&
          companyNotifications.map((companyNotification, index) => (
            <div key={index} className={cl.notificationItem + " pb-2 mb-3"}>
              Отклик на вакансию «{companyNotification.vacancy.title}», студент{" "}
              <Link to={VISIT_PROFILE_ROUTE} state={ companyNotification.student.id }>
                {companyNotification.student.firstName}
              </Link>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Notification;
