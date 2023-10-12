//di dalam mengimpor model di dalam key {...} harus sama dengan define yang ada di models
const { UsersModels } = require("../../../models");
//------------------------------------------------------------
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "erorr",
      message: validate,
    });
  }

  const userByEmail = await UsersModels.findOne({
    where: {
      email: req.body.email,
    },
  });

  const userByName = await UsersModels.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (userByEmail || userByName) {
    let errors = [];

    if (userByEmail) {
      errors.push("Email already exists");
    }

    if (userByName) {
      errors.push("Name already exists");
    }

    return res.status(400).json({
      status: "error",
      message: errors.join(", "),
    });
  }

  const password = await bcrypt.hash(req.body.password, 9);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createUsers = await UsersModels.create(data);

  return res.json({
    status: "success",
    data: {
      id: createUsers.id,
    },
  });
};
