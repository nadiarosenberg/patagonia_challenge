export enum ErrorReason {
  INPUT_ERROR = "INPUT_ERROR",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  NOT_CREATED = "NOT_CREATED",
  ALREADY_EXIST = "ALREADY_EXIST"
}
export class AppError extends Error {
  public readonly code: string;
  public readonly details: any;
  constructor(code: ErrorReason, message: any = "") {
    super();
    this.code = code;
    this.message = message;
  }
}
