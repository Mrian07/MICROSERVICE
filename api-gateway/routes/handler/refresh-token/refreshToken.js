const jwt = require("jsonwebtoken");

const apiAdapter = require("../../../api/ApiAdapter");

const {
  URL_SERVICE_USERS,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    //ambil paramater dari body email dan refresh token

    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if (!refreshToken || !email) {
      return res.status(400).json({
        status: "erorr",
        message: "Invalid Token",
      });
    }
    //cek token di dalam database
    await api.get("tokens", {
      params: { refresh_token: refreshToken },
    });

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: err.message,
        });
      }
      //cek email
      if (email !== decoded.data.email) {
        return res.status(400).json({
          error: "erorr",
          message: "email not valid",
        });
      }

      //jika kondisi terpenuhi semua

      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });
      return res.json({
        status: "success",
        data: token,
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        status: "erorr",
        message: "Service unvaible",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
