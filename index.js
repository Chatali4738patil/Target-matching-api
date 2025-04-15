const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const accountsRoutes = require('./routes/accounts');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret123';

// Middleware
app.use(cors());
app.use(express.json()); // <-- This is enough for JSON parsing

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user1' && password === 'pass123') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Routes for /accounts
app.use('/accounts', accountsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = SECRET_KEY;