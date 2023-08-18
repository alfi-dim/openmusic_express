const ValidatorContract = require('../../Interfaces/contracts/Validator');
const InvariantError = require('../../Exceptions/InvariantError');
const NotFoundError = require('../../Exceptions/NotFoundError');

class ValidationHelper extends ValidatorContract {
  constructor() {
    super();
    this.rule = {};
  }

  createRule(name) {
    return new Promise((resolve, reject) => {
      this.rule[name] = {};
      resolve();

      if (!this.rule[name]) {
        reject(new InvariantError(`Failed to create ${name} rule`));
      }
    });
  }

  initiateRule(name, rules) {
    return new Promise((resolve, reject) => {
      if (!name || !Array.isArray(rules)) {
        reject(new InvariantError('Invalid rule data'));
        return;
      }

      const formattedRules = [];
      rules.forEach((rule) => {
        const { fieldName, required, type } = rule;
        if (!fieldName || typeof required !== 'boolean' || !type) {
          reject(new InvariantError('Required data not found'));
          return;
        }

        formattedRules.push(rule);
      });

      this.rule[name] = formattedRules;
      resolve();
    });
  }

  getRule(name) {
    return this.rule[name] ?? new NotFoundError('Rule not found');
  }
}

module.exports = ValidationHelper;
