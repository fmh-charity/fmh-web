import {
  object,
  string,
  refine,
  optional,
  array,
  number,
} from "superstruct";

const CharPattern = /^[А-Яа-я-]+$/;
const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordPattern = /^[A-Za-z0-9!#$%&_-]+$/;
const DatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const сheckPasswordsEquality = (value: {
  password: string;
  passwordConfirm: string;
}): false | { passwordConfirm: string } => {
  if (value.password !== value.passwordConfirm) {
    return { passwordConfirm: "Пароль и проверочный пароль не совпадают" };
  }
  if (!value.password && !value.passwordConfirm) {
    return { passwordConfirm: "Пароль должен содержать минимум 6 символов" };
  }
  return false;
};

const CheckEmail = refine(string(), "CheckEmail", (value) => {
  if (value.length >= 45) {
    return "Email должен быть не длиннее 45 символов";
  }
  if (!EmailPattern.test(value)) {
    return "Некорректный e-mail";
  }
  return true;
});

const CheckPassword = refine(string(), "CheckPassword", (value) => {
  if (value.length < 6) {
    return "Пароль должен содержать минимум 6 символов";
  }
  if (!PasswordPattern.test(value)) {
    return "Пароль содержит недопустимые символы";
  }

  return true;
});

const CheckLastName = refine(string(), "CheckLastName", (value) => {
  if (value.length < 1) {
    return "Фимилия должна содержать от 1 символа";
  }
  if (value.length >= 30) {
    return "Фамилия должна быть не длиннее 30 символов";
  }
  if (!CharPattern.test(value)) {
    return "Поле содержит недопустимые символы";
  }
  return true;
});

const CheckFirstName = refine(string(), "CheckFirstName", (value) => {
  if (value.length < 1) {
    return "Имя должно быть от 1 символа";
  }
  if (value.length >= 30) {
    return "Имя должно быть не длинние 30 символов";
  }
  if (!CharPattern.test(value)) {
    return "Поле содержит недопустимые символы";
  }
  return true;
});

const CheckMiddleName = refine(string(), "CheckMiddleName", (value) => {
  if (value.length <= 1) {
    return "Отчество должно быть от 1 символа";
  }
  if (value.length >= 30) {
    return "Отчество должно быть не более 30 символов";
  }
  if (!CharPattern.test(value)) {
    return "Поле содержит недопустимые символы";
  }
  return true;
});


const CheckDateOfBirth = refine(string(), "CheckDateOfBirth", (value) => {
  if (!DatePattern.test(value)) {
    return "Неверный формат даты рождения. Используйте формат ДД.ММ.ГГГГ";
  }

  const minDate = new Date("1920-01-01");
  const maxDate = new Date();

  const [day, month, year] = value.split(".");
  const dateOfBirth = new Date(`${year}-${month}-${day}`);

  if (
    dateOfBirth >= minDate &&
    dateOfBirth <= maxDate &&
    maxDate.getFullYear() - dateOfBirth.getFullYear() <= 100 &&
    maxDate.getFullYear() - dateOfBirth.getFullYear() >= 10
  ) {
    return true;
  }
  return "Неверная дата рождения";
});

export const registrationSchemaStepOne = object({
  email: CheckEmail,
  password: CheckPassword,
  roleIds: array(number())
});

export const registrationSchema = object({
  firstName: CheckFirstName,
  lastName: CheckLastName,
  middleName: optional(CheckMiddleName),
  dateOfBirth: CheckDateOfBirth,
  roleIds: array(number()),
  email: CheckEmail,
  password: CheckPassword
});
