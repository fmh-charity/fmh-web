/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ErrorResponse = {
  code?:
    | "ERR_INVALID_LOGIN"
    | "ERR_UNEXPECTED"
    | "ERR_INVALID_REFRESH"
    | "ERR_NOT_FOUND"
    | "ERR_NO_RIGHTS"
    | "ERR_USER_EXISTS"
    | "ERR_MAX_UPLOAD"
    | "ERR_SEND_MAIL"
    | "ERR_DUPLICATE_DATA"
    | "ERR_INCORRECT_DATA"
    | "ERR_PERMISSION_DENIED";
  message?: string;
};
