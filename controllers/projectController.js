const Project = require('../models/projectModel');
const Participation = require('../models/participationModel');
const Belong = require('../models/belongModel'); 

async function getTeamIdFromProject(projectId) {
    const project = await Project.findById(projectId);
    return project ? project.team_id : null;
}

async function createProject(req, res) {
  try {
    const { description, team_id, project_url } = req.body;
    const create_by = req.user.id; 
    
    if (!team_id) return res.status(400).json({ error: 'Team ID is required' });

    const userRole = await Belong.getRole(create_by, team_id);
    if (!userRole) {
        return res.status(403).json({ error: 'Forbidden: You must be a member of the team to create a project' });
    }

    const projectId = await Project.create(description, team_id, create_by, project_url);
    await Participation.addParticipant(create_by, projectId);
    
    res.status(201).json({ projectId, message: 'Project created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating project' });
  }
}

async function addProjectParticipant(req, res) {
    try {
        const projectId = req.params.projectId;
        const { userId } = req.body;
        const currentUserId = req.user.id;
        
        const teamId = await getTeamIdFromProject(projectId);
        if (!teamId) return res.status(404).json({ error: 'Project not found' });
        
        const currentUserRole = await Belong.getRole(currentUserId, teamId);
        
        if (currentUserRole !== 'admin') {
             return res.status(403).json({ error: 'Forbidden: Only team administrators can add participants' });
        }
        
        await Participation.addParticipant(userId, projectId);
        res.status(200).json({ message: `User ${userId} added as participant to project ${projectId}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error adding participant' });
    }
}

async function removeProjectParticipant(req, res) {
  try {
    const projectId = req.params.projectId;
    const userId = req.params.userId; 
    const currentUserId = req.user.id;

    const teamId = await getTeamIdFromProject(projectId);
    if (!teamId) return res.status(404).json({ error: 'Project not found' });
    
    const currentUserRole = await Belong.getRole(currentUserId, teamId);
    
    if (currentUserRole !== 'admin' && String(currentUserId) !== String(userId)) {
         return res.status(403).json({ error: 'Forbidden: Only team administrators or yourself can remove participants' });
    }
    
    const [result] = await Participation.removeParticipant(userId, projectId);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Participant or Project not found in relation' });
    }
    
    res.status(200).json({ message: `User ${userId} removed from project ${projectId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error removing participant' });
  }
}

module.exports = { createProject, addProjectParticipant, removeProjectParticipant };