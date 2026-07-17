import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodTypeAny } from "zod";

import { ValidationError } from "../utils/validation-error";

function createValidator(
  schema: ZodTypeAny,
  target: "body" | "params" | "query",
): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    // console.log("======================");
    // console.log("METHOD:", req.method);
    // console.log("TARGET:", target);
    // console.log("BODY:", req.body);
    // console.log("PARAMS:", req.params);
    // console.log("QUERY:", req.query);
    // console.log("CONTENT-TYPE:", req.headers["content-type"]);
    // console.log("======================");
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      next(
        new ValidationError(
          "Validation failed",
          result.error.issues.map((issue) => issue.message),
        ),
      );
      return;
    }

    if (target === "body") {
      req.body = result.data;
    }

    if (target === "params") {
      req.params = result.data as Request["params"];
    }

    if (target === "query") {
      req.query = result.data as Request["query"];
    }

    next();
  };
}

export function validateBody(schema: ZodTypeAny): RequestHandler {
  return createValidator(schema, "body");
}

export function validateParams(schema: ZodTypeAny): RequestHandler {
  return createValidator(schema, "params");
}

export function validateQuery(schema: ZodTypeAny): RequestHandler {
  return createValidator(schema, "query");
}
