import { ICompany } from "./Company";
import { IProfession } from "./Profession";

export enum Graphic {
    ALL = "all",
    GRAPHIC_FULLDAY = "graphicFullDay",
    GRAPHIC_CHANGE = "graphicChange",
    GRAPHIC_ELASTIC = "graphicElastic",
    GRAPHIC_HOME = "graphicHome"
}

export interface IVacancy {
    id: number;
    title: string;
    price?: number;
    city: string;
    description: string;
    graphic: Graphic[] | [];
    duties: string[] | null;
    requirements: string[];
    conditions: string[];
    company: ICompany;
    profession: IProfession[];
    createdAt: Date;
}