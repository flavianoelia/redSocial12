'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Posts', 'autor', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Posts', 'abstract', {
            type: Sequelize.TEXT,
            allowNull: true
        });
        await queryInterface.addColumn('Posts', 'imagen', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Posts', 'pdf', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Posts', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
        await queryInterface.addColumn('Posts', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Posts', 'autor');
        await queryInterface.removeColumn('Posts', 'abstract');
        await queryInterface.removeColumn('Posts', 'imagen');
        await queryInterface.removeColumn('Posts', 'pdf');
        await queryInterface.removeColumn('Posts', 'createdAt');
        await queryInterface.removeColumn('Posts', 'updatedAt');
    }
};