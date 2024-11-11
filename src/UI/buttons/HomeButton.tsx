import { Link } from "react-router-dom"

type Props = {
    text: string,
    addClasses?: string
  }
  
const HomeButton = ({ text, addClasses = '' }: Props) => {
  return (
    <Link 
      to={'/auth'}
      className={addClasses}
    >
      {text}
    </Link>
  )
}

export default HomeButton