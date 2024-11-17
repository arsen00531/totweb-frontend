import { Form } from "react-bootstrap";
import cl from "../../pages/Profile/_Profile.module.scss";
import cl_student from "../ProfileStudent/_ProfileStudent.module.scss";
import { useUser } from "../../store/user.store";
import { UserRoles } from "../../models/User";
import { FileService } from "../../services/file.service";
import photo from "../../assets/react.svg";
import React, { useEffect, useState } from "react";
import { StudentService } from "../../services/user.service";
import { MDBBtn } from "mdb-react-ui-kit";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../../utils/constants/routes.constants";

export interface IStudentInfo {
  profession: string | null;
  university: string | null;
  lastYear: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  keySkills: string[];
  experiences: IExperienceInfo[];
  preferredFields: string[];
  locationPreferences: string[];
}

export interface IExperienceInfo {
  workPlace: string;
  profession: string;
  startDate: string;
  endDate: string;
  whatDo: string;
}

const EditProfileStudent = () => {
  const { student, roles, updateStudentInfo } = useUser();
  const [studentInfo, setStudentInfo] = useState<IStudentInfo>({
    profession: null,
    university: null,
    lastYear: null,
    contactEmail: null,
    contactPhone: null,
    keySkills: [],
    experiences: [],
    preferredFields: [],
    locationPreferences: [],
  });
  const [file, setFile] = useState(photo);
  const navigate = useNavigate()

  useEffect(() => {
    if (student) {
      setStudentInfo(student);
    }
  }, [student]);

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

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (student?.id && e.target.files) {
      const response = await StudentService.updateFile(
        { addFile: e.target.files[0] },
        student.id
      );
      getFile(response.data.photo);
    }
  };

  const addKeySkill = () => {
    studentInfo.keySkills.push("");
    setStudentInfo({ ...studentInfo });
  };

  const addExperience = () => {
    const experience: IExperienceInfo = {
      workPlace: "",
      profession: "",
      startDate: "",
      endDate: "",
      whatDo: "",
    };
    studentInfo.experiences.push(experience);

    setStudentInfo({ ...studentInfo });
  };

  const handleUpdate = () => {
    if (student && student.id) {
      updateStudentInfo(studentInfo, student.id)

      navigate(PROFILE_ROUTE)
    }
  };

  return (
    <div className={cl.profileContainer + " container mt-5 p-3 mb-5"}>
      <Form>
        <div className={cl_student.startInfo}>
          <div style={{ display: "flex", gap: "2em", flexWrap: "wrap" }}>
            <div className={cl_student.photo}>
              <label
                htmlFor="file-upload"
                className={cl_student.customFile}
              ></label>
              {roles?.includes(UserRoles.Student) && (
                <input id="file-upload" type="file" onChange={uploadFile} />
              )}
              <img src={file} alt="photo" className={cl_student.userPhoto} />
            </div>
            <div>
              <h2>
                {student?.firstName} {student?.lastName}
              </h2>
              <h5>
                <div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
                  <Form.Control
                    placeholder={"Профессия"}
                    value={studentInfo.profession ?? ""}
                    onChange={(e) =>
                      setStudentInfo({
                        ...studentInfo,
                        profession: e.target.value,
                      })
                    }
                  />
                  <Form.Control
                    placeholder={"Университет"}
                    value={studentInfo.university ?? ""}
                    onChange={(e) =>
                      setStudentInfo({
                        ...studentInfo,
                        university: e.target.value,
                      })
                    }
                  />
                </div>
              </h5>

              <h5>
                Окончание в
                <Form.Control
                  placeholder={"Graduate"}
                  value={studentInfo.lastYear ?? ""}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, lastYear: e.target.value })
                  }
                />
              </h5>
              <h6>
                Email:{" "}
                <Form.Control
                  placeholder={"Email"}
                  value={studentInfo.contactEmail ?? ""}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      contactEmail: e.target.value,
                    })
                  }
                />
              </h6>
              <h6>
                Phone:{" "}
                <Form.Control
                  placeholder={"Phone"}
                  value={studentInfo.contactPhone ?? ""}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      contactPhone: e.target.value,
                    })
                  }
                />
              </h6>
            </div>
          </div>
          <MDBBtn
            color={"danger"}
            onClick={() => {
              navigate(PROFILE_ROUTE)
            }}
            type={"button"}
            style={{ marginRight: "1em", position: "absolute", right: "1em" }}
          >
            Назад
          </MDBBtn>
        </div>

        <div className={cl.keySkils}>
          <h3>Ключевые навыки</h3>
          <div
            style={{
              display: "flex",
              gap: ".5em",
              marginBottom: ".9em",
              flexWrap: "wrap",
            }}
          >
            {studentInfo.keySkills && studentInfo.keySkills.length !== 0 ? (
              studentInfo.keySkills.map((keySkill, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <Form.Control
                    style={{ width: "8em" }}
                    placeholder={"Навык"}
                    value={keySkill}
                    onChange={(e) =>
                      setStudentInfo({
                        ...studentInfo,
                        keySkills: studentInfo.keySkills.map((keySkil, i) =>
                          index === i ? e.target.value : keySkil
                        ),
                      })
                    }
                  />
                  <button
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      height: "100%",
                    }}
                    className={cl.trash}
                    type={"button"}
                    onClick={() => {
                      setStudentInfo({
                        ...studentInfo,
                        keySkills: studentInfo.keySkills.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))
            ) : (
              <p>Не указано</p>
            )}
          </div>

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={addKeySkill}
          >
            Добавить навык
          </MDBBtn>
        </div>

        <div className={cl_student.experience}>
          <h3>Опыт</h3>
          {studentInfo?.experiences && studentInfo.experiences.length !== 0 ? (
            studentInfo.experiences.map((experience, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid rgba(76, 74, 74, 0.7)",
                  marginBottom: "1em",
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  Место работы
                  <button
                    style={{
                      height: "100%",
                      marginLeft: "1em"
                    }}
                    className={cl.trash}
                    type={"button"}
                    onClick={() => {
                      setStudentInfo({
                        ...studentInfo,
                        experiences: studentInfo.experiences.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
                <Form.Control
                  style={{ width: "17.5em" }}
                  placeholder={"Место работы"}
                  value={experience.workPlace}
                  onChange={(e) => {
                    studentInfo.experiences[index].workPlace = e.target.value;
                    setStudentInfo({ ...studentInfo });
                  }}
                />

                <p>Профессия</p>
                <Form.Control
                  style={{ width: "17.5em" }}
                  placeholder={"Профессия"}
                  value={experience.profession}
                  onChange={(e) => {
                    studentInfo.experiences[index].profession = e.target.value;
                    setStudentInfo({ ...studentInfo });
                  }}
                />

                <div>
                  <p>Когда начал</p>
                  <Form.Control
                    style={{ width: "17.5em" }}
                    placeholder={"Когда начал"}
                    value={experience.startDate}
                    onChange={(e) => {
                      studentInfo.experiences[index].startDate = e.target.value;
                      setStudentInfo({ ...studentInfo });
                    }}
                  />
                  <p>Когда закончил</p>
                  <Form.Control
                    style={{ width: "17.5em" }}
                    placeholder={"Когда закончил"}
                    value={experience.endDate}
                    onChange={(e) => {
                      studentInfo.experiences[index].endDate = e.target.value;
                      setStudentInfo({ ...studentInfo });
                    }}
                  />
                </div>
                <p>Что делал</p>
                <Form.Control
                  style={{ width: "17.5em" }}
                  placeholder={"Что делал"}
                  value={experience.whatDo}
                  onChange={(e) => {
                    studentInfo.experiences[index].whatDo = e.target.value;
                    setStudentInfo({ ...studentInfo });
                  }}
                />
              </div>
            ))
          ) : (
            <p>Не указано</p>
          )}

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={addExperience}
          >
            Добавить опыт
          </MDBBtn>
        </div>

        <div className="preferences" style={{ marginBottom: "2em" }}>
          <h3>Предпочтения в отношении стажировки</h3>
          <div>
            Предпочтения:{" "}
            {studentInfo?.preferredFields &&
            studentInfo.preferredFields.length !== 0 ? (
              studentInfo?.preferredFields.map((preferredField, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "17.5em",
                  }}
                >
                  <Form.Control
                    style={{ marginBottom: ".8em" }}
                    placeholder={"Предпочитение"}
                    value={preferredField}
                    onChange={(e) => {
                      studentInfo.preferredFields[index] = e.target.value;
                      setStudentInfo({
                        ...studentInfo,
                      });
                    }}
                  />
                  <button
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      height: "100%",
                    }}
                    className={cl.trash}
                    type={"button"}
                    onClick={() => {
                      setStudentInfo({
                        ...studentInfo,
                        preferredFields: studentInfo.preferredFields.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))
            ) : (
              <>Не указано</>
            )}
          </div>

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={() => {
              studentInfo.preferredFields.push("");
              setStudentInfo({ ...studentInfo });
            }}
          >
            Добавить Предпочитения
          </MDBBtn>

          <div>
            Предпочитаемые места работы:{" "}
            {studentInfo?.locationPreferences &&
            studentInfo.locationPreferences.length !== 0 ? (
              studentInfo?.locationPreferences.map(
                (locationPreference, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "17.5em",
                    }}
                  >
                    <Form.Control
                      style={{ marginBottom: ".8em" }}
                      placeholder={"Предпочитаемое место работы"}
                      value={locationPreference}
                      onChange={(e) => {
                        studentInfo.locationPreferences[index] = e.target.value;
                        setStudentInfo({
                          ...studentInfo,
                        });
                      }}
                    />
                    <button
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                      }}
                      className={cl.trash}
                      type={"button"}
                      onClick={() => {
                        setStudentInfo({
                          ...studentInfo,
                          locationPreferences:
                            studentInfo.locationPreferences.filter(
                              (_, i) => i !== index
                            ),
                        });
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                )
              )
            ) : (
              <>Не указано</>
            )}
          </div>

          <MDBBtn
            type={"button"}
            style={{ marginBottom: "1em" }}
            onClick={() => {
              studentInfo.locationPreferences.push("");
              setStudentInfo({ ...studentInfo });
            }}
          >
            Добавить Предпочитаемое место работы
          </MDBBtn>
        </div>

        <MDBBtn type={"button"} onClick={handleUpdate}>
          Сохранить
        </MDBBtn>
      </Form>
    </div>
  );
};

export default EditProfileStudent;
