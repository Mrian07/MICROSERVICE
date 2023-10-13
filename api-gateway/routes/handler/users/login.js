const apiAdapter = require("../../../api/ApiAdapter");

const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_TOKEN_EXPIRED,
} = process.env;

const { URL_SERVICE_USERS } = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const users = await api.post("/users/login", req.body);
    const data = users.data.data;
    //console.log(data);

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });

    const refreshtoken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_TOKEN_EXPIRED,
    });

    await api.post("/tokens", {
      refresh_token: refreshtoken,
      users_id: data.id,
    });

    return res.json({
      status: "success",
      data: { token, refresh_token: refreshtoken },
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
