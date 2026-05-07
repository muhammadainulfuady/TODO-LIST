const responseStandard = (
  res,
  statusCode,
  success,
  message,
  data = null,
  error = null,
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
};

module.exports = responseStandard;