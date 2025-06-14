import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  image: Joi.string().uri().optional(),
});
