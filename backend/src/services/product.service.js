const ProductRepository = require("@repositories/product.repository.js");

const ProductService = {
  getByKeyword: async (keyword, page = 1, limit = 20) => {
    const offset = (page - 1) * limit;

    if (keyword && keyword.trim() !== "") {
      const { count, rows } = await ProductRepository.findByKeywordPaginated(
        keyword,
        limit,
        offset
      );
      return {
        data: rows,
        meta: {
          total: count,
          page,
          totalPages: Math.ceil(count / limit),
        },
      };
    }

    const { count, rows } = await ProductRepository.findAllPaginated(
      limit,
      offset
    );

    return {
      data: rows,
      meta: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  getById: async (id) => {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  create: async (data) => {
    return await ProductRepository.create(data);
  },

  update: async (id, data) => {
    const exist = await ProductRepository.findById(id);
    if (!exist) throw new Error("Product not found");

    await ProductRepository.update(id, data);
    return await ProductRepository.findById(id);
  },

  delete: async (id) => {
    const exist = await ProductRepository.findById(id);
    if (!exist) throw new Error("Product not found");

    await ProductRepository.delete(id);
    return true;
  },
};

module.exports = ProductService;
