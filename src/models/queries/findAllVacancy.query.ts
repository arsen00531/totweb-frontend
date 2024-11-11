export interface IFindAllVacancyQuery {
    page: number
    limit: number
    search?: string
    city?: string
    graphic?: string[]
    professionIds?: number[]
}