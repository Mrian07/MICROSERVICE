"use strict";

const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "admin",
        role: "admin",
        email: "admin@gmail.com",
        profession: "admin",
        password: await bcrypt.hash("admin@gmail.com", 7),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: "mrian",
        role: "student",
        email: "mrian@gmail.com",
        profession: "developer",
        password: await bcrypt.hash("mrian@gmail.com", 7),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
