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

class FileRequiredError extends Error {
  constructor() {
    super("File required");
    this.status = 400;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class CloudinaryFailedError extends Error {
  constructor() {
    super("File storage failed");
    this.status = 503;
  }
}

class DeleteTheLastAdminAccountError extends Error {
  constructor() {
    super(
      "It is forbidden to delete the last account with these access rights"
    );
    this.status = 403;
  }
}

class UpdateOwnPasswordError extends Error {
  constructor() {
    super("A wrong password has been entered");
    this.status = 401;
  }
}

class IsAlreadyViewedError extends Error {
  constructor() {
    super("The item has already been reviewed");
    this.status = 400;
  }
}

class CustomHttpException extends Error {
  constructor({ status, message } = {}) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  UnauthorizedError,
  NotFoundError,
  EmailUsedError,
  AccessDeniedError,
  FileRequiredError,
  ValidationError,
  CloudinaryFailedError,
  CustomHttpException,
  DeleteTheLastAdminAccountError,
  UpdateOwnPasswordError,
  IsAlreadyViewedError,
};
