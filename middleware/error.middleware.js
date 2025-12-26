import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  // Custom thrown ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Prisma Errors
  if (err.code && err.code.startsWith("P")) {
    return handlePrismaError(err, res);
  }

  // JWT Auth Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid token",
      errors: [err.message],
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Token expired",
      errors: [err.message],
    });
  }

  // express-validator / schema validation
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: err.errors || [err.message],
    });
  }

  // Multer File Upload Errors
  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "File upload error",
      errors: [err.message],
    });
  }

  // SyntaxError (JSON Parse Fail)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid JSON format",
      errors: [err.message],
    });
  }

  // Fallback
  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

// Prisma Errors
const handlePrismaError = (err, res) => {
  switch (err.code) {
    case "P2002": {
      // Unique constraint failed
      const field = err.meta?.target?.[0] || "field";
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: `Duplicate value for ${field}`,
        errors: [`${field} already exists`],
      });
    }

    case "P2003":
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Foreign key constraint failed",
        errors: [err.meta?.field_name || "Related record missing"],
      });

    case "P2025":
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Record not found",
        errors: ["Resource does not exist"],
      });

    case "P2014":
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid ID format",
        errors: ["Invalid identifier"],
      });

    case "P2011":
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Required field missing",
        errors: [err.meta?.constraint || "Required field missing"],
      });

    case "P2000":
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Value too long for column",
        errors: [`Invalid value length`],
      });

    default:
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Database error",
        errors: [err.message],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
  }
};

export default errorHandler;
