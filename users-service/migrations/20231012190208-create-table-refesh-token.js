"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refresh_token", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      token: {
        type: Sequelize.TEXT,
        alloNull: false,
      },
      users_id: {
        type: Sequelize.INTEGER,
        alloNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        alloNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        alloNull: false,
      },
    });

    await queryInterface.addConstraint("refresh_token", {
      type: "foreign key",
      name: "REFRESH_TOKENS_USERS_ID",
      fields: ["users_id"],
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("refresh_token");
  },
};
