const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;


async function signUpUser(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });

    const existing = await User.findByEmailWithPassword(email);
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const userId = await User.create(first_name, last_name, email, hashed);
    return res.status(201).json({ userId, message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during sign up' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmailWithPassword(email);

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // 💡 إنشاء JWT Token باستخدام user_id
    const token = jwt.sign(
        { id: user.user_id }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRE }
    );
    
    // إرسال الـ Token مع بيانات المستخدم
    res.status(200).json({ 
        token, 
        user: {
            id: user.user_id,
            email: user.email,
            first_name: user.first_name
        }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
}

module.exports = { signUpUser, loginUser };