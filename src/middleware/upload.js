const multer = require('multer');
const path = require('path');


const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son de 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../static/uploads'));
    },
    filename: function (req, file, cb) {
        if (file.originalname !== 'template.xlsx') {
            return cb(new Error('Estas intentando cargar un archivo y/o plantilla incorrecta.'));
        } else {
            const uniqueSuffix = `${getFormattedDate()}__${req.user.userId}__${file.originalname}`;
            cb(null, uniqueSuffix);
        }
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
