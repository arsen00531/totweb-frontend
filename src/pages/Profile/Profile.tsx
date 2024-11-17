import ProfileCompany from '../../components/ProfileCompany/ProfileCompany'
import ProfileStudent from '../../components/ProfileStudent/ProfileStudent'
import { UserRoles } from '../../models/User'
import { useUser } from '../../store/user.store'
import cl from './_Profile.module.scss'

const Profile = () => {
  const { roles } = useUser()

  return (
    <div className={cl.profileContainer + " container mt-5 p-3"}>
      {
        roles?.includes(UserRoles.Student) ?
          <>
            <ProfileStudent />
          </> :
          <>
            <ProfileCompany />
          </>
      }
    </div>
  )
}

export default Profile