const { UsersModels, TokensModels } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const usersId = req.body.users_id;
  const refreshToken = req.body.refresh_token;

  const schema = {
    users_id: "number",
    refresh_token: "string",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "erorr",
      message: validate,
    });
  }

  const users = await UsersModels.findByPk(usersId);
  if (!users) {
    return res.status(400).json({
      status: "erorr",
      message: "users not found",
    });
  }

  const createdToken = await TokensModels.create({
    token: refreshToken,
    users_id: usersId,
  });

  return res.json({
    status: "success",
    data: {
      id_token: createdToken.id,
    },
  });
};
