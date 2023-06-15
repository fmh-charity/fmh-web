import { object, string, refine } from "superstruct";

const LoginCheck = refine(string(), "LoginCheck", (value) => {
  if (value.length >= 6) {
    return true;
  }
  return "Логин должен быть больше 6 символов";
});

const PasswordCheck = refine(string(), "PasswordCheck", (value) => {
  if (value.length >= 6) {
    return true;
  }
  return "Пароль должен быть больше 6 символов";
});

export const loginSchema = object({
  login: LoginCheck,
  password: PasswordCheck,
});
