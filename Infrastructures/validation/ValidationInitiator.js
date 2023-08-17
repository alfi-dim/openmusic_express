/* eslint-disable no-console */
class ValidationInitiator {
  constructor(validationHelper) {
    this.validationHelper = validationHelper;
  }

  registerRule(name, rules) {
    this.validationHelper.createRule(name)
      .then(() => console.info(`${name} rule created!`))
      .catch(() => console.error(`Failed to create ${name} rules`));

    this.validationHelper.initiateRule(name, rules)
      .then(() => console.log(`${name} rule initiated!`))
      .catch(() => console.error(`Failed to initiate ${name} rules`));
  }
}

module.exports = ValidationInitiator;
