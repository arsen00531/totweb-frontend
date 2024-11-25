import { useForm } from "react-hook-form";
import FormTextInput from "../../components/FormTextInput/FormTextInput";
import { TFormTextConfigVacancy, TFormVacancy } from "../../pages/CreateVacancy/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { VacancyCreateSchema } from "../../pages/CreateVacancy/config/userShema";
import { formTextVacancy } from "../../pages/CreateVacancy/config/formTextConfig";

type Props = {
  initialForm?: TFormVacancy;
};

const VacancyForm = ({
  initialForm = {
    title: "",
    description: "",
    city: "",
    price: "",
  },
}: Props) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormVacancy>({
    defaultValues: {
      ...initialForm
    },
    resolver: zodResolver(VacancyCreateSchema),
    mode: "onBlur",
  });
  const formTextConfig: TFormTextConfigVacancy[] = formTextVacancy(
    register,
    errors
  );

  return (
    <>
      {formTextConfig.map((formInput, index) => (
        <FormTextInput
          key={index}
          maxLength={formInput.maxLength}
          error={formInput.error}
          name={formInput.name}
          isTextarea={formInput.name === "description"}
          register={formInput.register}
          title={formInput.title}
          type={formInput.type}
        />
      ))}
    </>
  );
};

export default VacancyForm;
