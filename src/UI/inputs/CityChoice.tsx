import React from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  city: string,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  className?: string
}

const CityChoice = ({ city, className, setCity, setSelectedItem }: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      setSelectedItem(city)
    }
  };

  return (
    <Form.Control placeholder="City" className={className} onKeyDown={handleKeyDown} value={city} onChange={(e) => setCity(e.target.value)} />
  )
}

export default CityChoice