const Task = require('../models/taskmodels');
const AssignedTo = require('../models/assignedToModel');
const Notification = require('../models/notificationsModel');
const Participation = require('../models/participationModel'); 

async function createTask(req, res) {
  try {
    const { title, project_id, assigned_user_id, due_date, priority, description, status } = req.body;
    if (!title || !project_id) return res.status(400).json({ error: 'Title and Project ID are required' });
    
    if (assigned_user_id) {
        const [isParticipant] = await Participation.checkIfParticipant(assigned_user_id, project_id);
        
        if (!isParticipant || isParticipant.length === 0) {
            return res.status(403).json({ error: 'Forbidden: Assigned user is not a participant in this project' });
        }
    }
    
    const taskId = await Task.create(title, due_date, priority || 1, description, status || 0, project_id, null);

    if (assigned_user_id) {
      
      await AssignedTo.assignTask(assigned_user_id, taskId);
      await Notification.create('New Task Assigned', `You have been assigned to task: ${title}`, 'info', taskId, assigned_user_id);
    }
    
    return res.status(201).json({ taskId, message: 'Task created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating task' });
  }
}


async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const taskId = req.params.id;
    if (status === undefined) return res.status(400).json({ error: 'Status is required' });

    const [result] = await Task.update(taskId, { status });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating status' });
  }
}

module.exports = { createTask, updateTaskStatus };