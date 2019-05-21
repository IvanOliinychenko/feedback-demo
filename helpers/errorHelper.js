var createError = function(status = 500, message, errors = []) {
  var error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
}

module.exports = {
  createError,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL: 500
}
