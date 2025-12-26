import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { YesNo } from "../constant.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
  next();
};

export const validateHomeCollection = [
  body("householdId").isInt({ gt: 0 }).withMessage("householdId must be a positive integer"),
  body("userId").isInt({ gt: 0 }).withMessage("userId must be a positive integer"),
  body("quantity").isDecimal().withMessage("quantity must be a decimal number"),
  body("collectionDate").isISO8601().withMessage("collectionDate must be a valid ISO date"),
  body("collected").optional().isIn(YesNo).withMessage("invalid collected value"),
  resultHandler,
];

