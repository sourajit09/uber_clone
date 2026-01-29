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
        try{
        await sequelize.sync({alter: true}); 
        console.log("All tables synced successfully!");

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch(error){
        console.log("sync error",error);
        
    }
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });
    