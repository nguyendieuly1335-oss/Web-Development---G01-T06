const db = require("@models");
const { Op } = require("sequelize");
const Product = db.Product;

const ProductRepository = {
  findAllPaginated: (limit, offset) =>
    Product.findAndCountAll({ limit, offset, order: [["createdAt", "DESC"]] }),
  findByKeywordPaginated: (keyword, limit, offset) =>
    Product.findAndCountAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    }),
  findById: (id) => Product.findOne({ where: { id } }),
  findByProductId: (product_id) => Product.findOne({ where: { product_id } }),
  create: (data) => Product.create(data),
  update: (id, data) => Product.update(data, { where: { id } }),
  delete: (id) => Product.destroy({ where: { id } }),
};
module.exports = ProductRepository;
