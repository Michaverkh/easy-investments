import { object, string } from "yup";

export const loginFormSchema = object().shape({
  email: string().required("обязательное поле").email("неверный формат"),
  password: string()
    .required("обязательное поле")
    .min(6, "минимум 6 символов")
    .max(16, "максимум 16 символов"),

  /*
  Строки ниже для варианта с регистрацией

  .matches(/[0-9]/, getCharacterValidationError("digit"))
  .matches(/[a-z]/, getCharacterValidationError("lowercase"))
  .matches(/[A-Z]/, getCharacterValidationError("uppercase")),

    confirmPassword: string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),
  */
});
