import { object, number, ObjectSchema } from "yup";

export const getTopUpPortfolioFormSchema = (
  initialVAlues: Record<string, number>
): ObjectSchema<any> => {
  const shapeWithDynamicFields = Object.keys(initialVAlues).reduce(
    (obj, key) => {
      //@ts-ignore
      obj[key] = number("Введите число")
        .required("Обязательное поле")
        .min(0, "Число должно быть положительным");
      return obj;
    },
    {}
  );
  return object().shape(shapeWithDynamicFields);
};
