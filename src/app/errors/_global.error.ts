import { ErrorRequestHandler } from "express";
import { TErrorSources } from "@/interface";
import { ENV } from "@/config";

import { AppError } from "@/app/errors";

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  let errorSources: Array<TErrorSources> = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err:
      ENV.NODE_ENV === "development"
        ? (() => {
            const { stack, ...rest } = err;
            return rest;
          })()
        : null,
    stack: ENV.NODE_ENV === "development" ? err.stack?.split("\n") : null,
  });
};
