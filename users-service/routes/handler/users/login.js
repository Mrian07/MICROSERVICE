const { UsersModels } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
module.exports = async (req, res) => {
  const schema = {
    email: "email|empty:false",
    password: "string|min:6",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "erorr",
      message: validate,
    });
  }
  const users = await UsersModels.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!users) {
    return res.status(400).json({
      status: "error",
      message: "users not found",
    });
  }

  const cekpwd = await bcrypt.compare(req.body.password, users.password);
  if (!cekpwd) {
    return res.status(400).json({
      status: "error",
      message: "users not found",
    });
  }

  res.json({
    status: "success",
    data: {
      id: users.id,
      email: users.email,
      name: users.name,
      profession: users.profession,
      role: users.role,
      avatar: users.avatar,
    },
  });
};
