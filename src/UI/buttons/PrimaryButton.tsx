type Props = {
  text: string,
  type?: "submit" | "reset" | "button" | undefined,
  addClasses?: string
}

export default function PrimaryButton({ text, type, addClasses = '' }: Props) {
  return (
    <button 
      type={type}
      className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ' + addClasses}
    >
      {text}
    </button>
  )
}