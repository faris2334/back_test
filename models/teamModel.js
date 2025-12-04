const db = require('../config/db');


function generateRandomUrl(length = 16) {
  return Math.random().toString(36).substring(2, 2 + length);
}

const Team = {
  create: async (team_name, create_by, team_url) => {
    const t_url = generateRandomUrl();
    const [result] = await db.query(
      'INSERT INTO team (team_name, create_by, team_url) VALUES (?, ?, ?)',
      [team_name, create_by, t_url]
    );
    return result.insertId;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM team WHERE team_id = ?', [id]);
    return rows[0];
  },
  update: async (id, team_name, team_url) => {
    return db.query('UPDATE team SET team_name = ?, team_url = ? WHERE team_id = ?', [team_name, team_url, id]);
  },
  delete: async (id) => {
    return db.query('DELETE FROM team WHERE team_id = ?', [id]);
  }
};
module.exports = Team;