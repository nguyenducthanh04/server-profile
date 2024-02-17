const model = require("../models/index");
const Files = model.files;

class UploadFile {
  async UploadFile(req, res) {
    try {
      // Save file information to the database
      const newFile = await Files.create({
        filename: req.file.originalname,
        filepath: req.file.path,
      });
      console.log("path:", req.file.path);
      res.json({ message: "File uploaded successfully", file: newFile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getAllFile(req, res) {
    const fileList = await Files.findAll();
    res.json(fileList);
  }
  async updateFile(req, res) {
    const { id } = req.params;
    const { filename, filepath } = req.body;
    // const image = await Files.findByPk(id);
    // if (image) {
    const update = await Files.update(
      {
        filename,
        filepath,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ message: "File update successfully" });
    // }
  }
  async deleteFile(req, res) {
    const { id } = req.params;
    await Files.destroy({
      where: {
        id: id,
      },
    });
  }
}
module.exports = new UploadFile();
