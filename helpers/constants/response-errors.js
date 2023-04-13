const RESPONSE_ERRORS = {
  unauthorized: { status: 401, message: "Not authorized" },
  notFound: { status: 404, message: "Not found" },
  emailUsed: {
    status: 409,
    message: "Email in use",
  },
  accessDenied: {
    status: 403,
    message: "Do not have access rights to the content",
  },
};

module.exports = { RESPONSE_ERRORS };
