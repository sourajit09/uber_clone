const dotenv = require('dotenv');
dotenv.config();

// db.js
const { Sequelize } = require('sequelize');

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

// ... keep the rest of your code the same ...
async function connectToDb() {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectToDb };