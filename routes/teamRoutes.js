const express = require('express');
const router = express.Router();
const { createTeam, addTeamMember, removeTeamMember } = require('../controllers/teamsController');
const { leaveTeam } = require('../models/belongModel');
const { protect } = require('../middleware/authMiddleware');
const { checkTeamRole } = require('../middleware/roleMiddleware');

router.use(protect); 

router.post('/', createTeam);
router.post('/:teamId/members', checkTeamRole('admin'), addTeamMember);
router.delete('/:teamId/members/:userId', checkTeamRole('admin'), removeTeamMember);
router.post('/:teamId/members/:userId', checkTeamRole('member'), leaveTeam);

module.exports = router;