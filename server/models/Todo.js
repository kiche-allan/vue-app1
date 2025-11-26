const pool = require('../config/database');

class Todo {
  static async getAll() {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(text) {
    const result = await pool.query(
      'INSERT INTO todos (text) VALUES ($1) RETURNING *',
      [text]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const { text, completed } = updates;
    const result = await pool.query(
      'UPDATE todos SET text = $1, completed = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [text, completed, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async toggleComplete(id) {
    const result = await pool.query(
      `UPDATE todos 
       SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Todo;