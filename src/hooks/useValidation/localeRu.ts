/* eslint-disable no-template-curly-in-string */
export const mixed = {
  required: "${label} указать обязательно",
};
export const string = {
  min: "${label} должен содержать минимум ${min} символов",
  max: "${label} должен содержать не более ${max} символов",
};
export default Object.assign(Object.create(null), {
  mixed,
  string,
});
