import { ZodError } from "zod";
import { AppError, ErrorReason } from "../../../shared/appErrors";
import { NextFunction, Request, Response } from "express";

function present(status: number, reason: string, msg: any, res: Response) {
  res.status(status).json({
    status,
    error: {
      reason,
      msg,
    },
  });
}

export function manageError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return present(400, ErrorReason.INPUT_ERROR, error.errors, res);
  }

  const err = error as AppError;

  switch (err?.code) {
    case ErrorReason.NOT_FOUND:
      return present(404, err.code, err.message, res);
    case ErrorReason.ALREADY_EXIST:
      return present(409, err.code, err.message, res);
    case ErrorReason.SERVER_ERROR:
    case ErrorReason.NOT_CREATED:
      return present(500, err.code, err.message, res);
    default:
      return present(
        500,
        ErrorReason.SERVER_ERROR,
        err?.message ?? "unknown error",
        res,
      );
  }
}