import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

type Props = {
    children: React.ReactNode
    className?: string
}

const DropDown = ({ children, className }: Props) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active)
    }

  return (
    <div className={className}>
        <h5 onClick={handleClick} style={{ cursor: 'pointer' }}>Профессиональная область <IoIosArrowUp style={{ transition: "all 0.3s", transform: active ? "rotate(-180deg)" : "" }} /></h5>
        {
            active && children
        }
    </div>
  )
}

export default DropDown