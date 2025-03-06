const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary.config");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "audio_entries", // Folder name in Cloudinary
    // allowed_formats: ["wav", "mp3", "m4a"],
    resource_type: "video",
  },
});

const upload = multer({ storage });

module.exports = upload;
