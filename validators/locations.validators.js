import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
  next();
};

const atMostOneRelation = (req) => {
  const hasUser = req.body.userId !== undefined && req.body.userId !== null;
  const hasHousehold = req.body.householdId !== undefined && req.body.householdId !== null;
  const hasDustbin = req.body.dustbinId !== undefined && req.body.dustbinId !== null;
  const count = [hasUser, hasHousehold, hasDustbin].filter(Boolean).length;
  return count <= 1;
};

export const validateCreateLocation = [
  body("latitude").exists().withMessage("latitude is required").isFloat().withMessage("latitude must be a number"),
  body("longitude").exists().withMessage("longitude is required").isFloat().withMessage("longitude must be a number"),
  body("address").optional().isString(),
  body("city").optional().isString(),
  body("state").optional().isString(),
  body("zipcode").optional().isString(),
  body().custom((_, { req }) => {
    if (!atMostOneRelation(req)) throw new Error("provide at most one of userId, householdId, dustbinId");
    return true;
  }),
  body("userId").optional({ nullable: true }).isInt({ gt: 0 }).withMessage("userId must be a positive integer"),
  body("householdId").optional({ nullable: true }).isInt({ gt: 0 }).withMessage("householdId must be a positive integer"),
  body("dustbinId").optional({ nullable: true }).isInt({ gt: 0 }).withMessage("dustbinId must be a positive integer"),
  resultHandler,
];

export const validateUpdateLocation = [
  body("latitude").optional().isFloat().withMessage("latitude must be a number"),
  body("longitude").optional().isFloat().withMessage("longitude must be a number"),
  body("address").optional().isString(),
  body("city").optional().isString(),
  body("state").optional().isString(),
  body("zipcode").optional().isString(),
  body().custom((_, { req }) => {
    if (!atMostOneRelation(req)) throw new Error("provide at most one of userId, householdId, dustbinId");
    return true;
  }),
  body("userId").optional({ nullable: true }).custom((v) => v === null || (Number.isInteger(v) && v > 0)).withMessage("userId must be a positive integer or null"),
  body("householdId").optional({ nullable: true }).custom((v) => v === null || (Number.isInteger(v) && v > 0)).withMessage("householdId must be a positive integer or null"),
  body("dustbinId").optional({ nullable: true }).custom((v) => v === null || (Number.isInteger(v) && v > 0)).withMessage("dustbinId must be a positive integer or null"),
  resultHandler,
];
