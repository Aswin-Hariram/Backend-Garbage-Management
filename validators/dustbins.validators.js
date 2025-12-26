import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { DustbinStatus } from "../constant.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
  next();
};

export const validateDustbin = [
  body("adminId").isInt({ gt: 0 }).withMessage("adminId must be a positive integer"),
  body("location").notEmpty().withMessage("location is required"),
  body("status").optional().isIn(DustbinStatus).withMessage("invalid status"),
  body("lastCleaned").optional().isISO8601().toDate(),
  resultHandler,
];

