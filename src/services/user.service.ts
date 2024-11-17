import $api from "../http";
import { ICompany } from "../models/Company";
import { IStudent, IStudentUpdate, IStudentUpdateFile } from "../models/User";
import { ICompanyInfo } from "../components/EditProfileCompany/EditProfileCompany";

export class StudentService {
  private static readonly controllerPrefix = "student";

  static async update(updateStudentInfo: IStudentUpdate, id: number) {
    return $api.put<IStudent>(
      `${this.controllerPrefix}/update`,
      { ...updateStudentInfo, addExperience: updateStudentInfo.experiences },
      {
        params: {
          id,
        },
      }
    );
  }

  static async updateFile(updateStudentInfo: IStudentUpdateFile, id: number) {
    const bodyFormData = new FormData();
    if (updateStudentInfo.addFile) {
      bodyFormData.append("addFile", updateStudentInfo.addFile);
    }
    return $api.put<IStudent>(
      `${this.controllerPrefix}/updateFile`,
      bodyFormData,
      {
        params: {
          id,
        },
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
}

export class CompanyService {
  private static readonly controllerPrefix = "company";

  static async findOne() {}

  static async update(updateCompanyInfo: ICompanyInfo, id: number) {
    return $api.put<ICompany>(
      `${this.controllerPrefix}/update`,
      updateCompanyInfo,
      { params: { id } }
    );
  }
}
