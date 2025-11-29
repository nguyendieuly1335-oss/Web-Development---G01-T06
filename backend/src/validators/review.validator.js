const Joi = require("joi");

const reviewSchema = Joi.object({
  review_id: Joi.string().max(50).required(),
  product_id: Joi.number().integer().required(),
  source: Joi.string().max(50).required(),
  author: Joi.string().max(255).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  title: Joi.string().max(255),
  body: Joi.string(),
  created_at: Joi.date().iso().required(),
  verified_purchase: Joi.boolean().required(),
});
module.exports = reviewSchema;