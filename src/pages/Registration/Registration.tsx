import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React, { useState } from "react";
import {
  userFormTextRegistration,
  companyFormTextRegistration,
} from "./config/formTextConfig";
import { useNavigate } from "react-router-dom";
import {
  CompanyAuthService,
  StudentAuthService,
} from "../../services/auth.service";
import UserChoise from "../../UI/blocks/UserChoise";
import { UserRoles } from "../../models/User";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {
  CompanyRegistrationSchema,
  UserRegistrationSchema,
} from "./config/registrationSchema";
import {
  TFormCompanyRegistration,
  TFormCompanyTextConfigRegistration,
  TFormUserRegistration,
  TFormUserTextConfigRegistration,
} from "./types";
import { LOGIN_ROUTE } from "../../utils/constants/routes.constants";

const Registration = () => {
  const [isUserExists, setIsUserExists] = useState(false);
  const [user, setUser] = useState<UserRoles>();

  const navigate = useNavigate();

  const {
    register: registerUser,
    formState: { errors: userErrors },
    handleSubmit: handleUserSubmit,
  } = useForm<TFormUserRegistration>({
    resolver: zodResolver(UserRegistrationSchema),
    mode: "onBlur",
  });

  const {
    register: registerCompany,
    formState: { errors: companyErrors },
    handleSubmit: handleCompanySubmit,
  } = useForm<TFormCompanyRegistration>({
    resolver: zodResolver(CompanyRegistrationSchema),
    mode: "onBlur",
  });
  const formUserTextConfig: TFormUserTextConfigRegistration[] =
    userFormTextRegistration(registerUser, userErrors);
  const formCompanyTextConfig: TFormCompanyTextConfigRegistration[] =
    companyFormTextRegistration(registerCompany, companyErrors);

  const onUserSubmit = handleUserSubmit(async (data: TFormUserRegistration) => {
    try {
      await StudentAuthService.registration(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );

      navigate(LOGIN_ROUTE);
    } catch (error) {
      const err = error as AxiosError;

      console.log(err);
      if (err.status === 400) {
        setIsUserExists(true);
      }
    }
  });

  const onCompanySubmit = handleCompanySubmit(
    async (data: TFormCompanyRegistration) => {
      try {
        await CompanyAuthService.registration(
          data.companyName,
          data.email,
          data.password,
          data.contactPerson,
          data.phone
        );

        navigate(LOGIN_ROUTE);
      } catch (error) {
        const err = error as AxiosError;

        console.log(err);
        if (err.status === 400) {
          setIsUserExists(true);
        }
      }
    }
  );

  return (
    <>
      {user ? (
        <>
          {user === UserRoles.Student ? (
            <RegistrationForm
              isUserExists={isUserExists}
              formTextConfig={formUserTextConfig}
              onSubmit={onUserSubmit}
            />
          ) : (
            <RegistrationForm
              isUserExists={isUserExists}
              formTextConfig={formCompanyTextConfig}
              onSubmit={onCompanySubmit}
            />
          )}
        </>
      ) : (
        <UserChoise title={"Зарегистрироваться как"} setUser={setUser} />
      )}
    </>
  );
};

export default React.memo(Registration);
