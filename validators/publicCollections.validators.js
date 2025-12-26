import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { YesNo } from "../constant.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
  next();
};

export const validatePublicCollection = [
  body("dustbinId").isInt({ gt: 0 }).withMessage("dustbinId must be a positive integer"),
  body("quantity").isDecimal().withMessage("quantity must be a decimal number"),
  body("collectionDate").isISO8601().withMessage("collectionDate must be a valid ISO date"),
  body("collected").optional().isIn(YesNo).withMessage("invalid collected value"),
  resultHandler,
];

