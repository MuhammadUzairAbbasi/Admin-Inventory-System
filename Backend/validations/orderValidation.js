import Joi from "joi";

export const orderStatusSchema = Joi.object({
  status: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});
