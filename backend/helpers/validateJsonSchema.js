const { validate } = require('jsonschema');

function validateJsonSchema(jsonSchema) {
  return function(req, res, next) {
    const validation = validate(req.body, jsonSchema);

    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    return next();
  };
}

module.exports = validateJsonSchema;
