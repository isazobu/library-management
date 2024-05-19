import Joi from 'joi';


export const bookSchema = Joi.object({
    name: Joi
        .string()
        .pattern(new RegExp('^[A-Za-zÇŞĞÜÖİçşğüöı0-9 ]+$'), 'Only alphbatic characters including Turkish characters with numbers are allowed')
        .min(3).max(50).required(),
});