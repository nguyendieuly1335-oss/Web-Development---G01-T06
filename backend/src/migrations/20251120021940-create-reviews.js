"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "reviews",
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },

        review_id: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
        },

        product_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        source: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },

        author: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },

        rating: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },

        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },

        body: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        verified_purchase: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },

        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["review_id", "source"],
          },
        ],
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("reviews");
  },
};
