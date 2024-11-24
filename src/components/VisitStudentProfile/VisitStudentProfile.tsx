import { Button, Container } from "react-bootstrap";
import { FileService } from "../../services/file.service";
import React, { useEffect, useState } from "react";
import cl from "../ProfileStudent/_ProfileStudent.module.scss";
import photo from "../../assets/react.svg";
import { IStudent } from "../../models/User";
import { StudentService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { VACANCY_ROUTE } from "../../utils/constants/routes.constants";

type TVIsitStudentProfile = {
  studentId: number
}

const VisitStudentProfile = ({ studentId }: TVIsitStudentProfile) => {
  const [student, setStudent] = useState<IStudent>()
  const [file, setFile] = useState(photo);

  const navigate = useNavigate()

  if (!studentId) {
    navigate(VACANCY_ROUTE)
  }

  const getStudent = async () => {
    const studentResponse = await StudentService.findOne(studentId)

    setStudent(studentResponse.data)
  }

  const getFile = async (fileName?: string | null) => {
    if (student?.id && student.photo) {
      try {
        const response = await FileService.getFile(
          student?.id,
          fileName ?? student?.photo
        );
        const blob = new Blob([new Uint8Array(response.data.data)], {
          type: response.data.type,
        });
        const url = URL.createObjectURL(blob);
        setFile(url);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
  };

  useEffect(() => {
    getFile();
  }, [student]);

  useEffect(() => {
    getStudent()
  }, [])

  return (
    <Container>
      <div className={cl.startInfo}>
        <div style={{ display: "flex", gap: "2em" }}>
          <div className={cl.photo}>
            <label htmlFor="file-upload" className={cl.customFile}></label>
            <img src={file} alt="photo" className={cl.userPhoto} />
          </div>
          <div>
            <h2>
              {student?.firstName} {student?.lastName}
            </h2>
            <h5>
              {student?.profession
                ? student?.profession + ", "
                : "Профессия не указана, "}
              {student?.university
                ? student.university
                : "Университет не указан"}
            </h5>
            <h5>
              {student?.lastYear
                ? `Окончание в  ${student.lastYear}`
                : "Окончание не указано"}{" "}
            </h5>
            <h6>
              Email:{" "}
              {student?.contactEmail ? student?.contactEmail : "Не указано"}
            </h6>
            <h6>
              Phone:{" "}
              {student?.contactPhone ? student?.contactPhone : "Не указано"}
            </h6>
          </div>
        </div>
      </div>
      <div className={cl.keySkils}>
        <h3>Ключевые навыки</h3>
        {student?.keySkills && student.keySkills.length !== 0 ? (
          student.keySkills.map((keySkill, index) => (
            <Button key={index}>{keySkill}</Button>
          ))
        ) : (
          <p>Не указано</p>
        )}
      </div>
      <div className={cl.experience}>
        <h3>Опыт</h3>
        {student?.experiences && student.experiences.length !== 0 ? (
          student.experiences.map((experience, index) => (
            <React.Fragment key={index}>
              <p style={{ fontWeight: "bold" }}>Место работы: {experience.workPlace}</p>
              <p>Профессия: {experience.profession}</p>
              <p>
                Работал с {experience.startDate} до {experience.endDate}
              </p>
              <p>Что делал: {experience.whatDo}</p>
            </React.Fragment>
          ))
        ) : (
          <p>Не указано</p>
        )}
      </div>
      <div className="preferences">
        <h3>Предпочтения в отношении стажировки</h3>
        <p>
          Предпочитаемые области стажировки:{" "}
          {student?.preferredFields && student.preferredFields.length !== 0 ? (
            student?.preferredFields.map((preferredField, index) => (
              <React.Fragment key={index}>{preferredField}, </React.Fragment>
            ))
          ) : (
            <>Не указано</>
          )}
        </p>
        <p>
          Предпочитаемое места работы:{" "}
          {student?.locationPreferences &&
          student.locationPreferences.length !== 0 ? (
            student?.locationPreferences.map((locationPreference, index) => (
              <React.Fragment key={index}>{locationPreference}, </React.Fragment>
            ))
          ) : (
            <>Не указано</>
          )}
        </p>
      </div>
    </Container>
  );
};

export default VisitStudentProfile;
