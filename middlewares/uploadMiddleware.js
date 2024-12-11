const multer = require('multer'); // importa el módulo multer para la gestión de archivos
const path = require('path'); // importa el módulo path para trabajar con rutas de archivos y directorios

// Configuración del almacenamiento de imágenes con multer
const storage = multer.diskStorage({ // configura el almacenamiento en disco para los archivos subidos
    destination: function(req, file, cb) { // 
        cb(null, 'uploads/avatars'); // define la carpeta de destino para las imágenes subidas
    },
    filename: function(req, file, cb) { // define el nombre del archivo subido, utilizando un sufijo único basado en la fecha y un número aleatorio, y manteniendo la extensión original del archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtrar archivos para asegurarnos de que solo se suban imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes en formato JPEG, JPG o PNG'));
    }
};

// configuración del multer con el almacenamiento, el filtro de archivos y el límite de tamaño definidos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Límite de 10MB por imagen, aunque para una imagen de perfil alcanza con 2MB
});

module.exports = upload; // exporto la configuración de multer para q pueda ser utilizada en otros archivos de la aplicación