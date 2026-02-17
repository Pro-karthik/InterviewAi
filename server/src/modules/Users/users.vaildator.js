import joi from 'joi';

export const registervalidator = joi.object({
   

  email: joi.string().email().required(),

  password: joi
    .string()
    .min(8)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

 role: joi.string().lowercase().valid('user', 'admin').default('user')

});


export const LoginValidator=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).required()
});