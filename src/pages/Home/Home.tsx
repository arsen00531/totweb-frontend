import React from 'react'
import FindVacancy from '../../components/FindVacancy/FindVacancy'

type Props = {}

const Home = ({  }: Props) => {
  return (
    <main>
      <FindVacancy />
    </main>
  )
}

export default React.memo(Home)