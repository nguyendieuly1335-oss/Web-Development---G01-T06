const Joi = require("joi");

const productSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  title: Joi.string().max(255).required(),
  price: Joi.number().precision(2).min(0).required(),
  image_url: Joi.string().uri().max(500).required(),
});

module.exports = productSchema;
