import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const apiError = (err, req, res, next) => {
  const statusCode = err.statusCode || err.raw?.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const payload = {
    status: false,
    message,
  };

  if (err.code) {
    payload.code = err.code;
  }

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};