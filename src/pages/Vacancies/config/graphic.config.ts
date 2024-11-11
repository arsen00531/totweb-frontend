export interface IGraphic {
    all: boolean;
    graphicFullDay: boolean;
    graphicChange: boolean;
    graphicElastic: boolean;
    graphicHome: boolean;
}

export interface IGraphicConfig {
    label: string;
    id: keyof IGraphic
}

export const graphicConfig: IGraphicConfig[] = [
    { label: "Полный день", id: "graphicFullDay" }, 
    { label: "Сменный график", id: "graphicChange" }, 
    { label: "Гибкий график", id: "graphicElastic" }, 
    { label: "Удалённая работа", id: "graphicHome" }
]