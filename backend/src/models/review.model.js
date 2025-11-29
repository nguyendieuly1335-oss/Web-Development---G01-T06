"use strict";

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review_id: DataTypes.STRING,
      product_id: DataTypes.BIGINT,
      source: DataTypes.STRING,
      author: DataTypes.STRING,
      rating: DataTypes.TINYINT,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      verified_purchase: DataTypes.BOOLEAN,
    },
    {
      tableName: "reviews",
    }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };
  return Review;
};
