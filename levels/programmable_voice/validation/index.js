// An error subclass to use in validators
class NiceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NiceError';
  }
}
exports.NiceError = NiceError;

// Encapsulate code to deal with nice errors
exports.handleError = (e, helper, genericMessage) => {
  console.log(e);
  genericMessage = genericMessage || `
    There was a problem validating this objective. Please try again.
  `;
  if (e.name === 'NiceError') {
    helper.fail(e.message);
  } else {
    helper.fail(genericMessage);
  }
};

// clean an input string and lowercase it for testing
exports.containsTextOrThrow = (test, value, errorString) => {
  if (!value || typeof value !== 'string') throw errorString;
  const val = value.trim().toLowerCase();
  if (val.indexOf(test) < 0) {
    throw errorString;
  }
};
