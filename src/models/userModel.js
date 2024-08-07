const { createConnection } = require('../config/db_config');

class UserModel {
    async getAllUsers() {
        const connection = await createConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM users');
            return { rows, fields };
        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }
    }

    async getUserById(id) {
        const connection = await createConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('User not found');
            }
            return { user: rows[0], fields };
        } catch (error) {
            throw new Error(` ${error.message}`);
        } finally {
            await connection.end();
        }
    }

    async createUser(userData) {
        const connection = await createConnection();
        try {

            const [result] = await connection.query('INSERT INTO users SET ?', userData);
            return { id: result.insertId };
        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }
    }

    async updateUser(userData, id) {
        const connection = await createConnection();
        try {

            const [result] = await connection.query('UPDATE users SET ? WHERE id = ?', [userData, id]);
            return result;
        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }
    }


    async deleteUser(id) {
        const connection = await createConnection();

        try {

            const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
            return result;


        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }

    }
}

module.exports = UserModel;

