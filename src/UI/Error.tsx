import '../style/scss/registration.scss'

interface ErrorProps {
  error: string
}

const Error = ({ error }: ErrorProps) => {
  if (error !== '') return <p className='error'>{error}</p>
}

export default Error