const db = require('../config/db');
const Belong = {
  addMember: async (user_id, team_id, role = 'member') => {
    return db.query('INSERT INTO belong (user_id, team_id, role) VALUES (?, ?, ?)', [user_id, team_id, role]);
  },
  removeMember: async (user_id, team_id) => {
    return db.query('DELETE FROM belong WHERE user_id = ? AND team_id = ?', [user_id, team_id]);
  },
  getRole: async (user_id, team_id) => {
    const [rows] = await db.query('SELECT role FROM belong WHERE user_id = ? AND team_id = ?', [user_id, team_id]);
    return rows[0] ? rows[0].role : null;
  },
  leaveTeam: async (user_id, team_id) => {
    return db.query('DELETE FROM belong WHERE user_id = ? AND team_id = ?', [user_id, team_id]);
  }
};
module.exports = Belong;