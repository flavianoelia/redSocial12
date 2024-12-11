const Following = (sequelize, Sequelize) => { // recibe la instancia de sequelize y la clase Sequelize
    return sequelize.define('Following', { // define el modelo Following
        id_usuario: { // id_usuario es un campo de tipo entero
            type: Sequelize.INTEGER,
            allowNull: false, // no puede quedar vacío ese campo
            references: { // establece una referencia a la tabla Usuarios
                model: 'Usuarios', // Nombre de la tabla a la que se hace referencia
                key: 'id', // Clave primaria de la tabla Usuarios
            },
        },
        id_usuario_seguido: {
            type: Sequelize.INTEGER, // id tipo entero
            allowNull: false, //no puede quedar vacío ese campo
            references: {
                model: 'Usuarios', // Nombre de la tabla a la que se hace referencia
                key: 'id', // Clave primaria de la tabla Usuarios
            },
        },
    }, {
        timestamps: true, // nos dará el tiempo en q se creó o modificó un registro

        // para q no se repita ningún seguimiento
        indexes: [{ // índices para evitar duplicados
            unique: true, // la clave principal de following será la comnbinación de id_usuario y la de id_usuario seguido
            fields: ['id_usuario', 'id_usuario_seguido'], // para evitar repeticiones
        }, ],
    });
};

module.exports = Following;