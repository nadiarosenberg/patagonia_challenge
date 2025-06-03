import { ZodError } from "zod";
import { AppError } from "../../../shared/appErrors";

function present(status: number, reason: string, msg: string, res: any) {
  return res.status(status).json({
    status,
    error: {
      reason,
      msg,
    },
  });
}

export function manageError(error: any, response: any) {
  if (error instanceof ZodError) {
    return present(400, "INPUT_ERROR", error.message, response);
  }
  const err = error as AppError;
  switch (err?.code) {
    case "BAD_PARAMETERS":
    case "ALREADY_EXIST":
    case "BAD_REQUEST":
    case "INSUFFICIENT_BALANCE":
      return present(400, err.code, err.message, response);
    case "NOT_FOUND":
      return present(404, err.code, err.message, response);
    case "BAD_CREDENTIALS":
    case "FORBIDDEN":
      return present(403, err.code, err.message, response);
    case "UNAUTHORIZED":
    case "TOKEN_EXPIRED":
      return present(401, err.code, err.message, response);
    case "CONFLICT":
      return present(409, err.code, err.message, response);
    case "SERVER_ERROR":
    case "NOT_CREATED":
    case "NOT_UPDATED":
    case "NOT_DELETED":
      return present(500, err.code, err.message, response);
    case "NOT_IMPLEMENTED":
      return present(501, err.code, err.message, response);
    default:
      return present(
        500,
        "SERVER_ERROR",
        err?.message ?? "unknown error",
        response,
      );
  }
}