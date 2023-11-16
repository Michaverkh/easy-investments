import { object, ref, string } from "yup";

export const registrationFormSchema = object().shape({
  email: string().required("обязательное поле").email("неверный формат"),
  password: string()
    .required("обязательное поле")
    .min(6, "минимум 6 символов")
    .max(16, "максимум 16 символов")
    .matches(/[0-9]/, "в пароле должна быть цифра")
    .matches(/[a-z]/, "в пароле должна строчная буква")
    .matches(/[A-Z]/, "в пароле должна заглавная буква"),

  repeatPassword: string()
    .required("повторите пароль")
    .oneOf([ref("password")], "пароли не совпадают"),
});
