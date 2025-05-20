'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('posts', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Usuarios',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contenido: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            autor: {
                type: Sequelize.STRING,
                allowNull: true
            },
            abstract: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            imagen: {
                type: Sequelize.STRING,
                allowNull: true
            },
            pdf: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('posts');
    }
};
