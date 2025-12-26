import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
  next();
};

export const validateHousehold = [
  body("userId").isInt({ gt: 0 }).withMessage("userId must be a positive integer"),
  body("address").notEmpty().withMessage("address is required"),
  body("location").optional().isString(),
  resultHandler,
];

