const apiAdapter = require("../../../api/ApiAdapter");

const { URL_SERVICE_USERS } = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    const users = await api.post(`users/logout`, { users_id: id });
    return res.json(req.user);
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
