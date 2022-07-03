import React from "react";

export const getRefValue = (ref: any, value: any) =>
  ref.current ? ref.current.value : value;

export const getRefChecked = (ref: any, value: any) =>
  ref.current ? ref.current.checked : value;

export const getRefDate = (
  dateRef: React.RefObject<HTMLInputElement>,
  timeRef: React.RefObject<HTMLInputElement>
): number => {
  if (dateRef.current && timeRef.current) {
    const date = new Date(`${dateRef.current.value} ${timeRef.current.value}`);
    return date.getTime();
  }
  return Date.now();
};
