import { Form } from 'react-bootstrap'

type Props = {
    label: string
    name: string
    id?: string
    checked: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    className?: string
}

const CheckBox = ({ label, name, id, checked, onChange, className }: Props) => {
  return (
    <Form.Check
        type="checkbox"
        label={label}
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        className={"mb-1 " + className}
    />
  )
}

export default CheckBox