// Importa el módulo bcrypt para el hashing de contraseñas
const bcrypt = require("bcrypt"); // pide usar la libreria bycrypt para encriptar las contraseñas

const Usuario = (sequelize, Sequelize) => {
    return sequelize.define("Usuario", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING, // Almacena la URL o nombre del archivo de la imagen
            allowNull: true,
        },
    }, {
        timestamps: true,// Habilita la creación automática de los campos createdAt y updatedAt en el modelo
        hooks: { //interviene para hashear o encriptar la contraseña y no se guarde enb texto plano
            // Hook que se ejecuta antes de crear un nuevo registro de Usuario
            beforeCreate: async(Usuario) => {
                if (Usuario.password) { // Si el campo password está presente
                    const salt = await bcrypt.genSalt(10); // Genera un sal con un factor de costo de 10
                    Usuario.password = await bcrypt.hash(Usuario.password, salt); // Hashea la contraseña con la sal generada
                }
            },
            // Hook que se ejecuta antes de actualizar un registro de Usuario
            beforeUpdate: async(Usuario) => { 
                if (Usuario.changed("password")) { // Si el campo password ha cambiado
                    const salt = await bcrypt.genSalt(10); // Genera una sal con un factor de costo de 10
                    Usuario.password = await bcrypt.hash(Usuario.password, salt); // Hashea la nueva contraseña con la sal generada
                }
            },
        },
    })
}

module.exports = Usuario;