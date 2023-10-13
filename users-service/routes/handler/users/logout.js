const { UsersModels, TokensModels } = require("../../../models");

module.exports = async (req, res) => {
  const usersId = req.body.users_id;
  const users = await UsersModels.findByPk(usersId);

  if (!users) {
    return res.status(400).json({
      status: "erorr",
      message: "users not found",
    });
  }

  await TokensModels.destroy({
    where: { users_id: usersId },
  });

  return res.json({
    status: "success",
    message: "refresh token delete",
  });
};
