import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const resultHandler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(new ApiError(400, "Validation failed", errors.array()));
	next();
};

export const validateLogin = [
	body("email").isEmail().withMessage("valid email is required"),
	body("password").notEmpty().withMessage("password is required"),
	resultHandler,
];

export const validateRegister = [
	body("username").notEmpty().withMessage("username is required"),
	body("email").isEmail().withMessage("valid email is required"),
	body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
	resultHandler,
];
