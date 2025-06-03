export type Errors =
  | "NOT_IMPLEMENTED"
  | "BAD_PARAMETERS"
  | "ALREADY_EXIST"
  | "NOT_FOUND"
  | "BAD_CREDENTIALS"
  | "FORBIDDEN"
  | "TOKEN_EXPIRED"
  | "SERVER_ERROR"
  | "UNAUTHORIZED"
  | "NOT_CREATED"
  | "NOT_UPDATED"
  | "NOT_DELETED"
  | "BAD_REQUEST"

export class AppError extends Error {
  public readonly code: string;
  public readonly details: any;
  constructor(code: Errors, message: any = "") {
    super();
    this.code = code;
    this.message = message;
  }
}
