const dotenv = require('dotenv');
dotenv.config(); // 1. Load env vars first

const http = require('http');
const app = require('./App'); // 2. Lowercase 'app' to match filename
const { connectToDb, sequelize } = require('./db/db');
const User = require('./models/user.model');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

connectToDb()
    .then(async () => {
        // This command creates the tables if they don't exist
        await sequelize.sync(); 
        console.log("All tables synced successfully!");

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Failed to connect to DB:", err);
    });