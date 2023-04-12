const RESPONSE_ERRORS = {
  unauthorized: { status: 401, message: "Not authorized" },
  notFound: { status: 404, message: "Not found" },
  emailUsed: {
    status: 409,
    message: "Email in use",
  },
};

module.exports = { RESPONSE_ERRORS };
