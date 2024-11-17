import EditProfileCompany from "../../components/EditProfileCompany/EditProfileCompany"
import EditProfileStudent from "../../components/EditProfileStudent/EditProfileStudent"
import { UserRoles } from "../../models/User"
import { useUser } from "../../store/user.store"

const EditProfile = () => {
    const { roles } = useUser()
  return (
    <>
        {
            roles && roles.includes(UserRoles.Student) ?
                <EditProfileStudent /> :
                <EditProfileCompany />
        }
    </>
  )
}

export default EditProfile