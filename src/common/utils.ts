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
