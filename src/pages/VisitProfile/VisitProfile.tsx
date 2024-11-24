import { useLocation } from 'react-router-dom'
import VIsitStudentProfile from '../../components/VisitStudentProfile/VisitStudentProfile'
import cl from '../Profile/_Profile.module.scss'

const VisitProfile = () => {
  const { state }: { state: number } = useLocation()

  return (
    <div className={cl.profileContainer + " container mt-5 p-3"}>
      <VIsitStudentProfile studentId={state} />
    </div>
  )
}

export default VisitProfile