import cl from './_TextError.module.scss'

type Props = {
  error?: string
}

export default function TextError({ error }: Props) {
  return (
    <>
      {error && <span className={cl.errorMessage + ' text-center'}>{error}</span>}
    </>
  )
}