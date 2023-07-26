import { StructError, assert } from "superstruct";

export const assertObjectBySchema = (obj: any, schema: any) => {
  try {
    assert(obj, schema);
  } catch (err) {
    if (err instanceof StructError) {
      const fieldsErrors = err.failures().reduce(
        (acc, { key, message }) => ({
          ...acc,
          [key]: message,
        }),
        {}
      );
      return fieldsErrors;
    }
    console.error(err);
  }
  return false;
};

export const getEncodeURICompoponent = <T extends object>(data: T) =>
  Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

export const getArrayFromFormData = (formData: FormData, key: string) => {
  return [...formData.entries()]
    .filter((entry) => entry[0] === key)
    .map((entry) => entry[1]);
};
