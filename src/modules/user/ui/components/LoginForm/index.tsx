import { Box, TextField } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { IUserAuthInitialValues } from "../../../store/interfaces";
import { loginFormSchema } from "./validationSchemas";
import useStore from "../../../../../shared/hooks/useStore";
import { ButtonWithLoader } from "../../../../../shared/components/ButtonWithLoader";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { RouterPath } from "../../../../../shared/router/enums";

const LoginFormComponent: FC = () => {
  const { userStore } = useStore();
  const { isLoading, login, isAuth } = userStore;

  const addAssetInitialValues: IUserAuthInitialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: IUserAuthInitialValues) => {
    await login({ email: values.email, password: values.password });
  };

  return (
    <>
      {isAuth && <Navigate to={RouterPath.PORTFOLIO} replace={true} />}
      <Box>
        <Formik
          onSubmit={handleSubmit}
          initialValues={addAssetInitialValues}
          validationSchema={loginFormSchema}
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
                    <TextField
                      id="password-id"
                      label="пароль"
                      variant="outlined"
                      type="text"
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      sx={{ width: "100%" }}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                </Box>
                <ButtonWithLoader
                  isSubmit={true}
                  isLoading={isLoading}
                  actionName="Войти"
                />
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export const LoginForm = observer(LoginFormComponent);
