const multer = require("multer");

const multerOptions = () => {
    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb("Only Image is Allowed!", false);
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);
