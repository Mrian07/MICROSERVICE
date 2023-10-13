const { TokensModels } = require("../../../models");

module.exports = async (req, res) => {
  const refreshToken = req.query.refresh_token;

  const token = await TokensModels.findOne({
    where: { token: refreshToken },
  });

  if (!token) {
    return res.status(400).json({
      status: "erorr",
      message: "invalid token",
    });
  }

  return res.json({
    status: "success",
    token,
  });
};
