const XLSX = require('xlsx');
const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

const bulkDataUploadController = {
    uploadExcelData: async (req, res) => {
        const { file, user } = req; // Asumiendo que 'user' es añadido por el middleware de autenticación
        const filename = `upload_${Date.now()}_${user.userId}.xlsx`;
        const uploadPath = path.join(__dirname, '../../uploads', filename);

        // Renombrar el archivo subido
        fs.renameSync(file.path, uploadPath);

        try {
            const workbook = XLSX.readFile(uploadPath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            // Aquí iría tu lógica para procesar los datos y guardarlos en la base de datos

            res.status(200).send('Datos cargados correctamente');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al procesar el archivo');
        } finally {
            fs.unlink(uploadPath, (err) => {
                if (err) console.error('Error al eliminar el archivo subido:', err);
            });
        }
    }
};

module.exports = bulkDataUploadController;
