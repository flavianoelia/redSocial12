const { Sequelize } = require("sequelize"); // de la libreria sequelize traemos la clase Sequelize
const parameters = require("../config/config"); // salgo de la carpeta models con los dos puntos y voy al directorio raíz  entro a la carpeta config y después al archivo config para importas los parametros de configuración

const sequelize = new Sequelize( // Crea una instancia de Sequelize utilizando los parámetros de configuración importados. Estos parámetros incluyen el nombre de la base de datos, el nombre de usuario, la contraseña, el host y el dialecto de la base de datos.

    parameters.database,
    parameters.username,
    parameters.password, {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {}; // creo un objeto vacío y lo guardo en db en las lineas 15 y 16 guardo dentro del objeto

db.Sequelize = Sequelize; // guarda la clase Sequelize en el objeto db
db.sequelize = sequelize; // guarda la instancia de Sequelize en el objeto db

// importación e inicialización de modelos
db.Usuario = require('./usuario')(sequelize, Sequelize); // importa el modelo de usuario y lo inicializa con la instancia de Sequelize
db.Following = require('./following')(sequelize, Sequelize); // importa el modelo de following y lo inicializa con la instancia de Sequelize
db.Post = require('./post')(sequelize, Sequelize); // importa el modelo de post y lo inicializa con la instancia de Sequelize

// Definición de las Relaciones entre modelos
db.Usuario.hasMany(db.Post, { foreignKey: 'id_usuario' }); // define una relación de uno a varios entre un usuario y sus publicaciones donde un usuario puede tener muchos post
db.Post.belongsTo(db.Usuario, { foreignKey: 'id_usuario' }); // un post pertenece a un único usuario

// Define relaciones de muchos a muchos entre usuarios para representar seguidos y seguidores utilizando el modelo Following como tabla intermedia.
db.Usuario.belongsToMany(db.Usuario, {
    through: db.Following,
    as: 'seguidos', // Alias para los seguidores de un usuario
    foreignKey: 'id_usuario', // Clave foránea que referencia al usuario que se sigue
    otherKey: 'id_usuario_seguido' // Clave foránea que referencia al que sigue
});
//establecer relación de seguidores. un usuario va a tener varios seguidores
db.Usuario.belongsToMany(db.Usuario, {
    through: db.Following,
    as: 'seguidores', // Alias para los usuarios que un usuario está siguiendo
    foreignKey: 'id_usuario_seguido', // Clave foránea que referencia al usuario que sigue
    otherKey: 'id_usuario' // Clave foránea que referencia al usuario que esta siendo seguido
});


module.exports = db; // Exporta el objeto db que contiene los modelos y la instancia de Sequelize para que puedan ser utilizados en otras partes de la aplicación.