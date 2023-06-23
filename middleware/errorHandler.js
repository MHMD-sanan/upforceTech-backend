const ErrorResponse = require("../../../neokred/server/utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  let error = { ...err };
  error.message = err.message;
  if (err.code === 11000) {
    const message = "Email address already exist";
    error = new ErrorResponse(message, 400);
  }

  if (err.message === "request entity too large") {
    const message = "Profile file size should be less than 1Mb";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error ",
  });
};

module.exports = errorHandler;
