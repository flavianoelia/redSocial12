const multer = require('multer'); // importa el módulo multer para la gestión de archivos. Es un middleware para Node.js utilizado para gestionar la subida de archivos en aplicaciones Express.
const path = require('path'); // Es un módulo nativo de Node.js utilizado para trabajar con rutas de archivos y directorios.

// Configuración del almacenamiento de imágenes con multer
const storage = multer.diskStorage({ // configura el almacenamiento en disco para los archivos subidos
    destination: function(req, file, cb) { // define la carpeta de destino para las imágenes subidas
        const fs = require('fs');    // importa el módulo fs para trabajar con el sistema de archivos
        const dir = 'uploads/avatars';
        if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
  }
        cb(null, 'uploads/avatars'); // función de callback devuelve la llamada q se utiliza para indicar a multer dónde almacenar los archivos
    }, // el primer argumento null es para el error, indica que no hay ningún error y q el proceso puede continuar, degundo argumento, es la ruta al directorio donde se almacenarán los archivos
    filename: function(req, file, cb) { // define el nombre del archivo subido, utilizando un sufijo único basado en la fecha y un número aleatorio, y manteniendo la extensión original del archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtrar archivos para asegurarnos de que solo se suban imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes en formato JPEG, JPG, PNG o WEBP'), false);
    }
};

// configuración del multer con el almacenamiento, el filtro de archivos y el límite de tamaño definidos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Límite de 10MB por imagen, aunque para una imagen de perfil alcanza con 2MB
});

module.exports = upload; // exporto la configuración de multer para q pueda ser utilizada en otros archivos de la aplicación