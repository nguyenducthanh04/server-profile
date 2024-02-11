var express = require("express");
var router = express.Router();
const multer = require("multer");
const model = require("../models/index");
const Files = model.files;
const { UploadFile } = require("../controllers/UploadFileController");
const UploadFileController = require("../controllers/UploadFileController");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  UploadFile(req, res);
});
router.get("/", UploadFileController.getAllFile);
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { filename, filepath } = req.body;

    // Kiểm tra xem file ảnh có tồn tại không
    // const file = await Files.findByPk(id);
    // if (!file) {
    //   return res.status(404).json({ error: "file not found" });
    // }

    await Files.update(
      { filename, filepath },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/:id", UploadFileController.deleteFile);
module.exports = router;
