const ValidationError = require('../../Exceptions/ValidationError');

class PayloadValidator {
  constructor(validationHelper) {
    this.validationHelper = validationHelper;
  }

  validate(name, payload) {
    const rules = this.validationHelper.getRule(name);
    rules.forEach(({ required, fieldName, type }) => {
      if (required && !(fieldName in payload)) {
        throw new ValidationError('Required data not found');
      }
      // eslint-disable-next-line valid-typeof
      if (typeof payload[fieldName] !== type && (fieldName in payload)) {
        throw new ValidationError(`Invalid data type requirement: ${fieldName}`);
      }
    });
  }
}

module.exports = PayloadValidator;
