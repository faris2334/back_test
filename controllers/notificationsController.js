const Notification = require('../models/notificationsModel');

async function createNotifications(req, res) {
  try {
    const user_id = req.user.id; 
    const {title, message, task_id} = req.body;
    const notifications_c = await Notification.create(title, message, task_id, user_id);
    res.status(200).json({ notifications_c , message : 'notifications has been created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
}

async function deleteNotification(req, res) {
  try {
    const notification_id = req.params.id;
    const [result] = await Notification.delete(notification_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification has been deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting notification' });
  }
}


async function getUserNotifications(req, res) {
  try {
    const user_id = req.user.id; 
    const notifications_contact = await Notification.findAllByUser(user_id);
    res.status(200).json(notifications_contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
}

async function markNotificationAsRead(req, res) {
    try {
        const notification_id = req.params.id;
        const user_id = req.user.id; 
        
        const [result] = await Notification.markAsRead(notification_id, user_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Notification not found or access denied' });
        }
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error updating notification' });
    }
}

module.exports = { getUserNotifications, markNotificationAsRead ,createNotifications,deleteNotification};