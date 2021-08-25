//VALIDATION
const Joi = require('@hapi/joi');

// Register Validation

const  registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    
    });
     return schema.validate(data);   
};

//loginValidation
const  loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    
    });
     return schema.validate(data);   
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;