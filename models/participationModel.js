const db = require('../config/db');

const Participation = {
  addParticipant: async (user_id, project_id) => {
    return db.query('INSERT INTO participation (user_id, project_id) VALUES (?, ?)', [user_id, project_id]);
  },
  removeParticipant: async (user_id, project_id) => {
    return db.query('DELETE FROM participation WHERE user_id = ? AND project_id = ?', [user_id, project_id]);
  },
  checkIfParticipant: async (user_id, project_id) => {
    return db.query('SELECT user_id FROM participation WHERE user_id = ? AND project_id = ?', [user_id, project_id]);
  }
};

module.exports = Participation;