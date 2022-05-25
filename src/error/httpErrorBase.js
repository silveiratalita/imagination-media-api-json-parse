/** Dependencies */

/** Error hndler */
class HttpError extends Error {
  /**
     * Error
     * @param {Number} statusCode
     * @param {String} errorMessage
     */
  constructor(statusCode, errorMessage) {
    super(errorMessage, statusCode);
    if (!statusCode || !errorMessage) {
      throw new Error(`Internal error`);
    }

    this.status = statusCode;
    this.message = errorMessage;
  }

  /**
     * Error handler
     * @param {Number} status
     * @param {String} message
     */
  errorHandler(status, message) {
    throw new HttpError(message, status);
  }
}

/**
 * HttpError
 * @param {Number} status
 * @param {String} message
 */

module.exports = HttpError;
