const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

async function connectToDb() {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL successfully.');
        
        // 👇 ADD THIS LINE TO FIX THE ERROR
        await sequelize.sync({ force: true });
        console.log('All tables synced successfully!');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectToDb };