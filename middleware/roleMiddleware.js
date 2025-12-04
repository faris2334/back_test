const Belong = require('../models/belongModel'); 

const checkTeamRole = (requiredRole) => async (req, res, next) => {
    const userId = req.user.id;
    const teamId = req.params.teamId;

    if (!teamId) {
        return res.status(400).json({ error: 'Team ID is missing in request' });
    }

    try {
        const userRole = await Belong.getRole(userId, teamId);

        if (userRole === requiredRole) {
            next();
        } else {
            return res.status(403).json({ 
                error: `Forbidden, required role: ${requiredRole}`,
                userRole: userRole
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during role check' });
    }
};

module.exports = { checkTeamRole };