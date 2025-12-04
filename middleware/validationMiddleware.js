const validate = (schema) => {
  return (req, res, next) => {
    let validationErrors = [];

    for (const key of Object.keys(schema)) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) validationErrors.push(...error.details);
    }

    if (validationErrors.length) {
      return res.status(400).json({ errors: validationErrors });
    }

    next();
  };
};

module.exports = validate;
