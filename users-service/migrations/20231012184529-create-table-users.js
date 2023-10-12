"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      name: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      email: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      password: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        alloNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        alloNull: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "student"],

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
    await queryInterface.addConstraint("users", {
      type: "unique",
      fields: ["email"],
      name: "UNIQUE_USERS_EMAIL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
