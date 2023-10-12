const apiAdapter = require("../../../api/ApiAdapter");

const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const media = await api.delete(`/media/${id}`);
    return res.json(media.data);
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
