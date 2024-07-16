const mysql = require('mysql2/promise');


async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'devNode_crud_app'
        });
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error;
    }
}

module.exports = {
    createConnection
};