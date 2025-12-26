import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { CollectionType } from "../constant.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
  next();
};

export const validateAssignment = [
  body("collectionType").isIn(CollectionType).withMessage("invalid collectionType"),
  body().custom((_, { req }) => {
    const type = req.body.collectionType;
    if (type === "HOME") {
      const id = req.body.homeCollectionId;
      if (!id || !Number.isInteger(id) || id <= 0) throw new Error("homeCollectionId must be a positive integer for HOME type");
    } else if (type === "PUBLIC") {
      const id = req.body.publicCollectionId;
      if (!id || !Number.isInteger(id) || id <= 0) throw new Error("publicCollectionId must be a positive integer for PUBLIC type");
    } else {
      throw new Error("invalid collectionType");
    }
    return true;
  }),
  body("collectorId").isInt({ gt: 0 }).withMessage("collectorId must be a positive integer"),
  body("assignedAt").optional().isISO8601().withMessage("assignedAt must be a valid ISO date"),
  body("completedAt").optional().isISO8601().withMessage("completedAt must be a valid ISO date"),
  resultHandler,
];

