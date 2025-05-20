const multer = require('multer'); // importa el módulo multer para la gestión de archivos. Es un middleware para Node.js utilizado para gestionar la subida de archivos en aplicaciones Express.
const path = require('path'); // Es un módulo nativo de Node.js utilizado para trabajar con rutas de archivos y directorios.

// Configuración del almacenamiento de imágenes con multer
const storage = multer.diskStorage({ // configura el almacenamiento en disco para los archivos subidos
    destination: function(req, file, cb) { // define la carpeta de destino para las imágenes subidas
        const fs = require('fs');    // importa el módulo fs para trabajar con el sistema de archivos
        let dir = 'uploads/avatars'; // Por defecto para avatares
         if (file.fieldname === 'imagen') { // Para imágenes de posts
            dir = 'uploads/posts';
        } else if (file.fieldname === 'pdf') { // Para PDFs de posts
            dir = 'uploads/pdfs';
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);  
    }, 
filename: function(req, file, cb) { // define el nombre del archivo subido, utilizando un sufijo único basado en la fecha y un número aleatorio, y manteniendo la extensión original del archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const allowedPdfTypes = /pdf/;
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype.toLowerCase();

    if (file.fieldname === 'avatar') { // Para avatares
        const isValidExt = allowedTypes.test(extname);
        const isValidMime = allowedTypes.test(mimetype.replace(/image\//, ''));
        if (isValidExt && isValidMime) {
            return cb(null, true);
        } else {
            return cb(new Error('Solo se permiten imágenes en formato JPEG, JPG, PNG o WEBP para avatares'), false);
        }
    } else if (file.fieldname === 'imagen') { // Para imágenes de posts
        const isValidExt = allowedTypes.test(extname);
        const isValidMime = allowedTypes.test(mimetype.replace(/image\//, ''));
        if (isValidExt && isValidMime) {
            return cb(null, true);
        } else {
            return cb(new Error('Solo se permiten imágenes en formato JPEG, JPG, PNG o WEBP para posts'), false);
        }
    } else if (file.fieldname === 'pdf') { // Para PDFs de posts
        const isValidExt = allowedPdfTypes.test(extname);
        const isValidMime = allowedPdfTypes.test(mimetype);
        if (isValidExt && isValidMime) {
            return cb(null, true);
        } else {
            return cb(new Error('Solo se permiten archivos PDF'), false);
        }
    } else {
        return cb(new Error('Campo de archivo no reconocido'), false);
    }
};

// configuración del multer con el almacenamiento, el filtro de archivos y el límite de tamaño definidos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // Límite de 50MB por archivo
});


module.exports = upload; // exporto la configuración de multer para q pueda ser utilizada en otros archivos de la aplicación