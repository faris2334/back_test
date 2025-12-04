const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { createTask, updateTaskStatus } = require('../controllers/tasksController');

router.use(protect);

router.post('/task/create', createTask);
router.put('/task/update/:taskId', updateTaskStatus);

module.exports = router;