const Joi = require('joi');

const signUpSchema = {
    body: Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z0-9ء-ي\s]{3,50}$/).trim().min(3).max(50),
        email: Joi.string().email(),
        phone_number: Joi.string().pattern(/^01[0125][0-9]{8}$/),
        password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#^]{8,}$/),
    }).required(),
};

const signInSchema = {
    body: Joi.object({
        email: Joi.string().email(),
        password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#^]{8,}$/),
    }).required(),
};

module.exports = {signUpSchema ,signInSchema};