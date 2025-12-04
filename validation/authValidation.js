const Joi = require('joi');

const signUpSchema = {
    body: Joi.object({
        frist_name: Joi.string().pattern(/^[a-zA-Z0-9ء-ي\s]{3,50}$/).trim().min(3).max(50),
        last_name: Joi.string().pattern(/^[a-zA-Z0-9ء-ي\s]{3,50}$/).trim().min(3).max(50),
        email: Joi.string().email(),
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