import React from 'react'
import FindVacancy from '../../components/FindVacancy/FindVacancy'

const Home = () => {
  return (
    <main>
      <FindVacancy />
    </main>
  )
}

export default React.memo(Home)