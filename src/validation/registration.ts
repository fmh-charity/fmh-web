import { object, string, refine, optional, array, number } from "superstruct";

const EmailCheck = refine(string(), "EmailCheck", (value) => {
  if (value.length >= 6) {
    return true;
  }
  return "Email должен быть больше 6 символов";
});

const PasswordCheck = refine(string(), "PasswordCheck", (value) => {
  if (value.length >= 6) {
    return true;
  }
  return "Пароль должен быть больше 6 символов";
});

export const registrationPasswordMatchSchema = refine(
  object({
    firstName: optional(string()),
    lastName: optional(string()),
    middleName: optional(string()),
    dateOfBirth: optional(string()),
    roleIds: optional(array(number())),
    email: optional(string()),
    password: string(),
    passwordConfirm: string(),
  }),
  "RegistrationPasswordMatch",
  (value) => {
    if (value.password === value.passwordConfirm) {
      return true;
    }
    return "Пароль и проверочный пароль не совпадают";
  }
);

export const registrationSchema = object({
  firstName: string(),
  lastName: string(),
  middleName: string(),
  dateOfBirth: string(),
  roleIds: optional(array(number())),
  email: EmailCheck,
  password: PasswordCheck,
  passwordConfirm: optional(string()),
});
