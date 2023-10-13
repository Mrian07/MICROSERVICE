const { UsersModels } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "erorr",
      message: validate,
    });
  }

  //ambil id terlebih dahulu di params
  const id = req.params.id;
  //-----------------------------------
  const users = await UsersModels.findByPk(id);
  if (!users) {
    return res.status(404).json({
      status: "erorr",
      message: "users not found",
    });
  }

  const email = req.body.email;
  if (email) {
    const cekEmail = await UsersModels.findOne({
      where: { email },
    });

    if (cekEmail && email !== users.email) {
      return res.status(409).json({
        status: "erorr",
        message: "email already exist",
      });
    }
  }

  const password = await bcrypt.hash(req.body.password, 9);
  const { name, profession, avatar } = req.body;

  await users.update({
    email,
    password,
    name,
    profession,
    avatar,
  });

  return res.json({
    status: "success",
    data: {
      id: users.id,
      name,
      email,
      profession,
      avatar,
    },
  });
};
