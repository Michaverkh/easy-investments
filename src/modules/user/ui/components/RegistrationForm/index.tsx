import { Box, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { IUserAuthInitialValues } from "../../../store/interfaces";
import useStore from "../../../../../shared/hooks/useStore";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import { registrationFormSchema } from "./validationSchemas";
import { RouterPath } from "../../../../../shared/router/enums";
import { ButtonWithLoader } from "../../../../../shared/components/ButtonWithLoader";
import { PasswordInput } from "../../../../../shared/components/PasswordInput";

const RegistrationFormComponent: FC = () => {
  const { userStore } = useStore();
  const { isLoading, registration, isAuth } = userStore;

  const addAssetInitialValues: IUserAuthInitialValues = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = async (values: IUserAuthInitialValues) => {
    await registration({ email: values.email, password: values.password });
  };

  return (
    <>
      {isAuth && <Navigate to={RouterPath.PORTFOLIO} replace={true} />}
      <Box>
        <Formik
          onSubmit={handleSubmit}
          initialValues={addAssetInitialValues}
          validationSchema={registrationFormSchema}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => {
            return (
              <form onSubmit={handleSubmit} id="form1">
                <Box
                  sx={{
                    "& > *": {
                      marginBottom: "20px",
                    },
                  }}
                >
                  <Box>
                    <TextField
                      id="email-id"
                      label="email"
                      variant="outlined"
                      type="text"
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      sx={{ width: "100%" }}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box>
                    <PasswordInput
                      value={values.password}
                      label="пароль"
                      name="password"
                      onChange={handleChange}
                      errorText={errors.password}
                      isError={!!touched.password && !!errors.password}
                    />
                  </Box>
                  <Box>
                    <PasswordInput
                      value={values.repeatPassword || ""}
                      label="повторите пароль"
                      name="repeatPassword"
                      onChange={handleChange}
                      errorText={errors.repeatPassword}
                      isError={
                        !!touched.repeatPassword && !!errors.repeatPassword
                      }
                    />
                  </Box>
                </Box>
                <ButtonWithLoader
                  isSubmit={true}
                  isLoading={isLoading}
                  actionName="Зарегистрироваться"
                />
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export const RegistrationForm = observer(RegistrationFormComponent);
