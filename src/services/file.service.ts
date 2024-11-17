import $api from "../http"

export class FileService {
    private static readonly controllerPrefix = "file"

    static async getFile(studentId: number, fileName: string) {
        return $api.get(`${this.controllerPrefix}/getFile`, {
            params: {
                path: `${String(studentId)}/${fileName}`
            }
        })
    }
}