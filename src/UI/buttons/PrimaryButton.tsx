import { Button } from "react-bootstrap";

type Props = {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  addClasses?: string;
};

export default function PrimaryButton({ text, type, addClasses = "" }: Props) {
  return (
    <Button type={type} className={addClasses}>
      {text}
    </Button>
  );
}
