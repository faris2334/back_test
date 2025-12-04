const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserNotifications, markNotificationAsRead, deleteNotification ,createNotifications} = require('../controllers/notificationsController');
const { checkTeamRole } = require('../middleware/roleMiddleware');
router.use(protect);

router.post('/', checkTeamRole("admin") ,createNotifications);
router.get('/', getUserNotifications);
router.put('/:id/read', markNotificationAsRead);
router.delete('/:id', checkTeamRole('admin') , deleteNotification);


module.exports = router;