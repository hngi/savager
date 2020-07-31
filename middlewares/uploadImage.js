const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const upload = multer({ dest: "uploads" });

const uploadImage = async (req, res, next) => {
  try {
    const imagePath = req.file.path;
    console.log('.>>>', imagePath)
    if (!imagePath) {
      return next(new Error("error submitting form"));
    }

    const uploadedImage = await cloudinary.uploader.upload(imagePath);
    req.imageUrl = uploadedImage.secure_url;
    req.user = { _id: '5f2416e0162a8029eba437c1'}
    return next();
  } catch (err) {
    return next(new Error("error uploading the file"));
  }
};

const uploadImageMW = [upload.single("image"), uploadImage];

module.exports = uploadImageMW;
