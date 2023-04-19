class UnauthorizedError extends Error {
  constructor() {
    super("Not authorized");
    this.status = 401;
  }
}

class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.status = 404;
  }
}

class EmailUsedError extends Error {
  constructor() {
    super("Email in use");
    this.status = 409;
  }
}

class AccessDeniedError extends Error {
  constructor() {
    super("Do not have access rights to the content");
    this.status = 403;
  }
}

class ImageRequiredError extends Error {
  constructor() {
    super("Image required");
    this.status = 400;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  UnauthorizedError,
  NotFoundError,
  EmailUsedError,
  AccessDeniedError,
  ImageRequiredError,
  ValidationError,
};
