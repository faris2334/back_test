const express = require('express');
const router = express.Router();
const { createProject, addProjectParticipant, removeProjectParticipant } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createProject);                                
router.post('/:projectId/participants', addProjectParticipant);
router.delete('/:projectId/participants/:userId', removeProjectParticipant);

module.exports = router;