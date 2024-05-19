import Joi from 'joi';


export const userSchema = Joi.object({
    name: Joi
        .string()
        .pattern(new RegExp('^[A-Za-zÇŞĞÜÖİçşğüöı ]+$'), 'Only alphbatic characters including Turkish characters')
        .min(3).max(30).required(),
});

