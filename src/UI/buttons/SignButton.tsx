import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

type SignButtonProps = {
    burgerOpen: boolean
    cl: CSSModuleClasses
  }
  
  const SignButton = ({ burgerOpen, cl }: SignButtonProps) => {
    return <>
      {
        burgerOpen ? 
        <>
          <Navbar.Toggle className={`${cl.my_navbar_toggler_icon} me-3`} style={{ display: "block" }} >
            <Link to={'/auth'} className='btn btn-primary' >Sign in</Link>
          </Navbar.Toggle>
  
          <Navbar.Toggle className={cl.my_navbar_toggler_icon} style={{ display: "block" }} >
            <Link to={'/registration'} className='btn btn-primary' >Sign up</Link>
          </Navbar.Toggle>
        </>
        :
        <>
          <button className={`${cl.my_navbar_toggler_icon} something`} style={{ display: "block" }} >
            <Link to={'/auth'} className='btn btn-primary' >Sign in</Link>
          </button>
  
          <button className={cl.my_navbar_toggler_icon} style={{ display: "block" }} >
            <Link to={'/registration'} className='btn btn-primary' >Sign up</Link>
          </button>
        </>
      }
    </>
}

export default SignButton