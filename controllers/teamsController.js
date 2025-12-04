const Team = require('../models/teamModel');
const Belong = require('../models/belongModel'); 

async function createTeam(req, res) {
  try {
    const { team_name, team_url } = req.body;
    // 💡 افترضنا أن req.user.id يأتي من الـ Token
    const create_by = req.user.id; 
    if (!team_name) return res.status(400).json({ error: 'Team name is required' });

    const teamId = await Team.create(team_name, create_by, team_url);
    
    // منطق العمل: إضافة المنشئ تلقائياً كمدير (admin)
    await Belong.addMember(create_by, teamId, 'admin'); 
    
    res.status(201).json({ teamId, message: 'Team created successfully and creator added as admin' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating team' });
  }
}

async function addTeamMember(req, res) {
  try {
    const teamId = req.params.teamId;
    const { userId, role } = req.body;

    await Belong.addMember(userId, teamId, 'member');
    res.status(200).json({ message: `User ${userId} added to team ${teamId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error adding member' });
  }
}

async function removeTeamMember(req, res) {
  try {
    const teamId = req.params.teamId;
    const userId = req.params.userId; 

    const [result] = await Belong.removeMember(userId, teamId);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member or Team not found in relation' });
    }

    res.status(200).json({ message: `User ${userId} removed from team ${teamId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error removing member' });
  }
}

module.exports = { createTeam, addTeamMember, removeTeamMember };