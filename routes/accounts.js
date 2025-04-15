const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
let accounts = require('../data/accounts');

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json(accounts);
});

router.post('/:id/status', (req, res) => {
  const { status } = req.body;
  const account = accounts.find(acc => acc.id == req.params.id);

  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }

  account.status = status;
  res.json({ message: 'Status updated', account });
});

module.exports = router;