export const sendResponse = (res, { statusCode = 200, message = 'OK', data = null } = {}) => {
  return res.status(statusCode).json({
    status: true,
    message,
    data,
  });
};