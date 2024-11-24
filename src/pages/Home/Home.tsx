import React from 'react'
import FindVacancy from '../../components/FindVacancy/FindVacancy'
import Advents from '../../components/Advents/Advents'

const Home = () => {
  return (
    <main>
      <FindVacancy />
      <Advents />
    </main>
  )
}

export default React.memo(Home)