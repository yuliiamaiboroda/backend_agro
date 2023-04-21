const { ValidationErrors } = require("./validation-errors");

class BooleanErrors extends ValidationErrors {
  constructor(name = null) {
    super(name);
  }

  boolean() {
    if (!this.fieldName) {
      return this;
    }
    this.messages["boolean.base"] = `${this.fieldName} must be a boolean`;
    return this;
  }
}

module.exports = { BooleanErrors };
