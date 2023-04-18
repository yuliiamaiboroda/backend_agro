const { ValidationErrors } = require("./validation-errors");

class ObjectErrors extends ValidationErrors {
  constructor(name = null) {
    super(name);
  }

  object() {
    if (!this.fieldName) {
      return this;
    }
    this.messages["object.base"] = `${this.fieldName} must be a object`;
    return this;
  }

  extraFields() {
    if (!this.fieldName) {
      return this;
    }
    this.messages["object.unknown"] = "Additional fields are present";
    return this;
  }

  min(number) {
    if (!this.fieldName) {
      return this;
    }
    this.messages["object.min"] = `${this.fieldName} must have at least 1 key`;
    return this;
  }
}

module.exports = { ObjectErrors };
