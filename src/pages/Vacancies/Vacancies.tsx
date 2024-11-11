import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useVacancy } from "../../store/vacancy.store";
import { MDBBtn, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { IoSearch } from "react-icons/io5";
import cl from './_Vacancy.module.scss'
import CityChoice from "../../UI/inputs/CityChoice";
import DropDown from "../../UI/inputs/DropDown";
import CheckBox from "../../UI/inputs/CheckBox";
import { graphicConfig, IGraphic } from "./config/graphic.config";
import { useProfession } from "../../store/profession.store";
import Vacancy from "../../components/Vacancy/Vacancy";
import H2Black from "../../UI/text/H2Black";
import { RiFilterFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

type Props = {}

export interface ICheckboxConfig<T extends boolean> {
  [key: string]: T;
}

const Vacancies = ({}: Props) => {
  const { vacancies, setVacancies, updateVacancies } = useVacancy()
  const { professions } = useProfession()

  const [selectedItem, setSelectedItem] = useState("");
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("");
  const [graphic, setGraphic] = React.useState<IGraphic>({
    all: true,
    graphicFullDay: false,
    graphicChange: false,
    graphicElastic: false,
    graphicHome: false
  })
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [isProfessions, setIsProfessions] = useState<boolean[]>([])
  const [isThrow, setIsThrow] = useState(false)

  useEffect(() => {
    setVacancies()
  }, [])

  useEffect(() => {
    const profess = Array.from({length: professions.length}, () => false);
    setIsProfessions(profess)
  }, [professions])

  useEffect(() => {
    if (isOpenFilter) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpenFilter])

  useEffect(() => {
    const searchInput: string | undefined = search.length !== 0 ? search : undefined
    const selectedCity: string | undefined = selectedItem.length !== 0 ? selectedItem : undefined

    if (isProfessions.every((value) => !value) && graphic.all) {
      updateVacancies({ page: 1, limit: 10, search: searchInput, city: selectedCity })
      setIsThrow(false)
      return
    }

    let graphics: string[] | undefined = Object.keys(graphic).filter((graphicKey) => {
      if (graphic[graphicKey as keyof IGraphic]) {
        return graphicKey
      }
    })
    graphics = graphics.length !== 0 ? graphics : undefined

    const proffs = isProfessions.map((isProfession, i) => isProfession ? professions[i].id : null)
    let ids: number[] | undefined = proffs.filter((proff) => proff !== null)
    ids = ids.length !== 0 ? ids : undefined

    updateVacancies({ graphic: graphics, professionIds: ids, search: searchInput, city: selectedCity, page: 1, limit: 10 })
    setIsThrow(true)
  }, [selectedItem, isProfessions, graphic])

  const acceptAllFilters = () => {
    const searchInput: string | undefined = search.length !== 0 ? search : undefined
    const selectedCity: string | undefined = city.length !== 0 ? city : undefined

    if (isProfessions.every((value) => !value) && graphic.all) {
      updateVacancies({ page: 1, limit: 10, search: searchInput, city: selectedCity })
      setIsThrow(false)
      return
    }

    let graphics: string[] | undefined = Object.keys(graphic).filter((graphicKey) => {
      if (graphic[graphicKey as keyof IGraphic]) {
        return graphicKey
      }
    })
    graphics = graphics.length !== 0 ? graphics : undefined

    const proffs = isProfessions.map((isProfession, i) => isProfession ? professions[i].id : null)
    let ids: number[] | undefined = proffs.filter((proff) => proff !== null)
    ids = ids.length !== 0 ? ids : undefined

    updateVacancies({ graphic: graphics, professionIds: ids, search: searchInput, city: selectedCity, page: 1, limit: 10 })
    setIsThrow(true)
  }

  const handleProfessionChange = (index: number) => () => {
    const newProfession = isProfessions.map((isProfession, i) => i === index ? !isProfession : isProfession)
    setIsProfessions(newProfession)
  };

  const handleGraphicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyConfig = {...graphic, [e.target.id]: !graphic[e.target.id as keyof IGraphic]};
    const isAll = Object.values(copyConfig).includes(true);
  
    if (isAll) {
      setGraphic({...copyConfig, all: false});
    } else {
      setGraphic({...copyConfig, all: true});
    }
  }

  const handleClickAccept = () => {
    setIsOpenFilter(false)
    acceptAllFilters()
  }

  const handleClickNullFilter = () => {
    setGraphic({
      all: true,
      graphicFullDay: false,
      graphicChange: false,
      graphicElastic: false,
      graphicHome: false
    })
    const profess = Array.from({length: professions.length}, () => false);
    setIsProfessions(profess)
    setSearch("")
    setIsOpenFilter(false)
    updateVacancies({ page: 1, limit: 10 })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      acceptAllFilters()
    }
  }

  return (
    <Container className={"mt-5"}>
      <h1 className={"mb-5"}>Вакансии</h1>
        <div className={cl.MDBInput_sticy_div + ' mb-2'}>
          <MDBInputGroup className={cl.MDBInputGroup_custom}>
            <MDBInput 
              label={"Какую специальность ищешь?"} 
              labelClass={cl.MDBInput_label_custom} 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              type="text" 
              size="lg" 
              className={cl.MDBInput_custom} 
              onKeyDown={handleKeyDown} 
              >
              <IoSearch size={25} className={cl.io_search_custom} />
            </MDBInput>
            <MDBBtn outline style={{ overflow: 'visible' }} onClick={acceptAllFilters}>Найти</MDBBtn>
          </MDBInputGroup>
        </div>
        <div className={cl.filter__header}>
          <div 
            className={`${cl.filter} ${(isOpenFilter ? cl.active : "")}`} 
            style={{ top: isOpenFilter ? window.scrollY : 0 }}
          >
            <div className={cl.filterClose} onClick={() => setIsOpenFilter(!isOpenFilter)}>
              <IoMdClose size={35} />
            </div>
            <div className={cl.acceptButtons}>
              <Button 
                size={"lg"} 
                variant={"secondary"} 
                className={cl.nullFilter} 
                onClick={handleClickNullFilter}
              >
                Сбросить фильтры
              </Button>
              <Button 
                size={"lg"} 
                className={cl.acceptFilter} 
                onClick={handleClickAccept}
              >
                Применить
              </Button>
            </div>
            <div className={cl.filter__child}>
              <h5>Регион и населённый пункт</h5>
              <CityChoice 
                city={city} 
                setCity={setCity} 
                setSelectedItem={setSelectedItem} 
                className={cl.filter__child_city + " mb-4"} 
              />
              <DropDown className="mb-4">
                { 
                  professions.map(
                    (profession, index) => 
                      <CheckBox 
                        key={profession.id} 
                        label={profession.name} 
                        name={profession.name} 
                        checked={isProfessions[index]} 
                        onChange={handleProfessionChange(index)} 
                      />
                  ) 
                }
              </DropDown>
              <div className="graphic_work">
                <h5 className="mb-2">График работы</h5>
                {
                  graphicConfig.map(
                    (config, index) => 
                      <CheckBox 
                        key={index} 
                        label={config.label} 
                        name="graphic" 
                        id={config.id} 
                        checked={graphic[config.id]} 
                        onChange={handleGraphicChange} 
                      />
                  )
                }
              </div>
              <Button 
                variant={"secondary"} 
                className={"mt-4"} 
                style={{ display: isThrow ? "block" : "none" }}
              >
                Сбросить все
              </Button>
            </div>
          </div>
          <div className="container-fluid">
            <div className={cl.activateFilter}>
              <H2Black>Фильтры</H2Black>
              <Button size={"sm"} variant="secondary" onClick={() => setIsOpenFilter(!isOpenFilter)}>
                <RiFilterFill size={20} color={"black"} />
              </Button>
            </div>
            <p>Найдено вакансий {vacancies.length}</p>
            {
              vacancies && 
              <>
                { 
                  vacancies.map((vacancy) => <Vacancy vacancy={vacancy} key={vacancy.id} />) 
                }
              </>
            }
          </div>
        </div>

    </Container>
  )
}

export default React.memo(Vacancies);