const db = require('../config/db');

const Notification = {
  create: async (title, message, task_id, user_id) => {
    const [result] = await db.query(
      'INSERT INTO notifications (title, message, task_id, user_id) VALUES (?, ?, ?, ?)',
      [title, message, task_id, user_id]
    );
    return result.insertId;
  },
  findAllByUser: async (user_id) => {
    const [rows] = await db.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY create_at DESC', [user_id]);
    return rows;
  },
  markAsRead: async (notification_id, user_id) => {
    return db.query('UPDATE notifications SET is_read = 1 WHERE notification_id = ? AND user_id = ?', [notification_id, user_id]);
  },
  delete: async (notification_id) => {
    return db.query('DELETE FROM notifications WHERE notification_id = ?', [notification_id]);
  }
};
module.exports = Notification;