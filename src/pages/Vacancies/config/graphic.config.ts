import { Graphic } from "../../../models/Vacancy";

export interface IGraphic {
    all: boolean;
    graphicFullDay: boolean;
    graphicChange: boolean;
    graphicElastic: boolean;
    graphicHome: boolean;
}

export interface IGraphicConfig {
    label: string;
    id: Graphic
}

export const graphicConfig: IGraphicConfig[] = [
    { label: "Полный день", id: Graphic.GRAPHIC_FULLDAY }, 
    { label: "Сменный график", id: Graphic.GRAPHIC_CHANGE }, 
    { label: "Гибкий график", id: Graphic.GRAPHIC_ELASTIC }, 
    { label: "Удалённая работа", id: Graphic.GRAPHIC_HOME }
]