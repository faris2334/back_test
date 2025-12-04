const Belong = require('../models/belongModel'); 

async function addToTeam(req, res) {
  const { userId, role } = req.body; 
  const team_id = req.params.teamId; 

  
  try {
    await Belong.addMember(userId, team_id, role || 'member');
    res.status(200).json({ success: true, message: 'User added to team' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error adding member' });
  }
}

async function leaveTeam(req, res) {
  const user_id = req.params.userId;
  const team_id = req.params.teamId; 
  
  
  try {
    const [result] = await Belong.removeMember(user_id, team_id);
    
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Membership not found' });
    }
    
    res.status(200).json({ success: true, message: 'User left the team' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error leaving team' });
  }
}

module.exports = { addToTeam, leaveTeam };