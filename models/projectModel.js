const db = require('../config/db');

const Project = {
  create: async (description, team_id, create_by, project_url) => {
    const [result] = await db.query(
      'INSERT INTO project (description, team_id, create_by, project_url) VALUES (?, ?, ?, ?)',
      [description, team_id, create_by, project_url]
    );
    return result.insertId;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM project WHERE project_id = ?', [id]);
    return rows[0];
  },
  findAllByTeam: async (team_id) => {
    const [rows] = await db.query('SELECT * FROM project WHERE team_id = ?', [team_id]);
    return rows;
  },
  update: async (id, description, project_url) => {
    return db.query('UPDATE project SET description = ?, project_url = ? WHERE project_id = ?', [description, project_url, id]);
  },
  delete: async (id) => {
    return db.query('DELETE FROM project WHERE project_id = ?', [id]);
  }
};
module.exports = Project;