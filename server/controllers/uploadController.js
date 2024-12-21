const path = require("path");

const upload = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(req.files);

  let uploadedFile = req.files.file;

  const uploadPath = path.join(
    __dirname,
    "../public/uploads/" + `${uploadedFile.name}`
  );

  await uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({
      data: `uploads/${uploadedFile.name}`,
      message: "File uploaded successfully!",
    });
  });
};

module.exports = { upload };
