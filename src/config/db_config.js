const mysql = require('mysql2/promise');

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
              console.error(`Error connecting to the database:${process.env.DB_NAME}`, error.message);

        throw error;
    }
}

module.exports = {
    createConnection
};
