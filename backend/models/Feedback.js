const db = require('../config/db');

class Feedback {
  static async create(feedbackData) {
    const { user_id, feedback_text, sentiment } = feedbackData;
    const sql = 'INSERT INTO feedback (user_id, feedback_text, sentiment) VALUES (?, ?, ?)';
    const [result] = await db.promise().execute(sql, [user_id, feedback_text, sentiment]);
    return result.insertId;
  }

  static async findAll() {
    const sql = 'SELECT f.id, f.feedback_text, f.sentiment, f.created_at, u.name, u.email FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC';
    const [rows] = await db.promise().execute(sql);
    return rows;
  }

  static async getAnalytics() {
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) as negative,
        SUM(CASE WHEN sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral
      FROM feedback
    `;
    const [rows] = await db.promise().execute(sql);
    return rows[0];
  }
}

module.exports = Feedback;