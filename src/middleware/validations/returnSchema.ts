import Joi from 'joi';


export const returnSchema = Joi.object({
    score: Joi
        .number()
        .min(0).max(10).required(),
        
});

