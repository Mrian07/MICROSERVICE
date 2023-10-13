const { UsersModels } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const users = await UsersModels.findByPk(id, {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  });

  if (!users) {
    return res.status(400).json({
      status: "erorr",
      message: "users not found",
    });
  }

  return res.json({
    status: "success",
    data: users,
  });
};
