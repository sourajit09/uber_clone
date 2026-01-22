const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const BlacklistToken = sequelize.define('BlacklistToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true 
});

module.exports = BlacklistToken;