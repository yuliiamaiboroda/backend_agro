const ROLES_LIST = Object.freeze({
  admin: "admin",
  applyManager: "applyManager",
  servicesManager: "servicesManager",
  productsManager: "productsManager",
});

const USER_ROLES = Object.values(ROLES_LIST);

module.exports = { ROLES_LIST, USER_ROLES };
