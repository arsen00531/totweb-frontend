import cl from './_Buttons.module.scss'
import { FaPencilAlt } from "react-icons/fa";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  style?: React.CSSProperties | undefined
}

const PencilButton = ({ style, onClick }: Props) => {
  return (
    <button
      className={cl.change}
      type={"button"}
      onClick={onClick}
      style={style}
    >
      <FaPencilAlt />
    </button>
  )
}

export default PencilButton