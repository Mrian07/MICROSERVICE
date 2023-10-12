const express = require("express");
const router = express.Router();
const fs = require("fs");
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
//--------------------------panggil model---------------------//
const { MediaModels } = require("../models");
//------------------------------------------------------------//

router.get("/", async (req, res) => {
  const media = await MediaModels.findAll({
    attributes: ["id", "image"],
  });
  //ambil nilai dengan url
  const parsemedia = media.map((m) => {
    m.image = `${req.get("host")}/${m.image}`;
    return m;
  });
  //--------------
  return res.json({
    status: "success",
    message: parsemedia,
  });
});

router.post("/", (req, res) => {
  const image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(404).json({ status: "erorr", message: "invalid base64" });
  } else {
    base64Img.img(
      image,
      "./public/images",
      Date.now(),
      async (err, filepath) => {
        if (err) {
          return get
            .status(400)
            .json({ status: "erorr", message: err.message });
        } else {
          const filename = filepath.split("\\").pop().split("/").pop();

          const MediaCreate = await MediaModels.create({
            image: `images/${filename}`,
          });

          return res.json({
            status: "success",
            data: {
              id: MediaCreate.id,
              image: `${req.get("host")}/images/${filename}`,
            },
          });
        }
      }
    );
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const media = await MediaModels.findByPk(id);

  if (!media) {
    return res.status(404).json({
      status: "erorr",
      message: "media not found",
    });
  }
  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err) {
      return res.status(404).json({
        status: "erorr",
        message: err.message,
      });
    }
    await media.destroy();

    return res.json({
      status: "success",
      message: "image success deleted",
    });
  });
});

module.exports = router;
