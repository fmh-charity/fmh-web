/* eslint-disable no-template-curly-in-string */
const mixed = {
  required: "${label} указать обязательно",
};
const string = {
  min: "${label} должен содержать минимум ${min} символов",
  max: "${label} должен содержать не более ${max} символов",
};
const number = {
  min: "${label} должен быть минимум ${min}",
  max: "${label} должен быть максимум ${max}",
};
export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
});
