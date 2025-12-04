const express = require('express');
const router = express.Router();
const { getUser, updateName } = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware'); 

router.use(protect);

router.get('/:id', getUser);          
router.put('/name/:id', updateName); 

module.exports = router;