const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async create(userData) {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().execute(sql, [name, email, hashedPassword, role]);
    return result.insertId;
  }

  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.promise().execute(sql, [email]);
    return rows[0];
  }

  static async findById(id) {
    const sql = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
    const [rows] = await db.promise().execute(sql, [id]);
    return rows[0];
  }
}

module.exports = User;