const db = require("@models");
const Review = db.Review;

const ReviewRepository = {
  findAllPaginated: (limit, offset) =>
    Review.findAndCountAll({ limit, offset, order: [["created_at", "DESC"]] }),
  countAllByProductId: (product_id) => {
    return Review.count({
      where: { product_id }
    });
  },
  findByProductPaginated: (product_id, limit, offset, source, sortBy) => {
    const whereClause = { product_id };
    if (source && source !== 'All') {
        whereClause.source = source;
    }
    let orderClause = [['created_at', 'DESC']];
    if (sortBy === 'highest') {
        orderClause = [['rating', 'DESC']];
    } else if (sortBy === 'lowest') {
        orderClause = [['rating', 'ASC']];
    }
    return Review.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: orderClause,
    });
  },
  bulkInsert: async (reviews) => {
    return Review.bulkCreate(reviews, {
      ignoreDuplicates: true,
    });
  },
  findAll: () => Review.findAll(),
  findById: (id) => Review.findOne({ where: { id } }),
  create: (data) => Review.create(data),
  update: (id, data) => Review.update(data, { where: { id } }),
  delete: (id) => Review.destroy({ where: { id } }),
};
module.exports = ReviewRepository;
